var express = require('express');
var router = express.Router();
var models = require('../models');
var async   = require('async');
var authMiddleware = require('./authMiddleware');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.prestamo.findAll({where:req.query}).then(function (response) {
     res.json(response);
  });
});
router.post('/reservar',authMiddleware.ensureAthenticated, function(req, res, next) {
    async.parallel([
        function(callback) {
            models.alumno.findOne({where:{codigo:req.body.codigo,estado:"activo"}}).then(function (alumno) {
                if(alumno){
                    callback(null,alumno);
                }else callback("alumno no encontrado");
            });
        },
        function(callback) {
            models.libro.findOne({where:{isbn:req.body.isbn,estado:"disponible"}}).then(function (libro) {
                if(libro){
                    callback(null,libro);
                }else callback("libro no encontrado");
            });
        },
        function (callback) {
            models.personal.findOne({where:{idPersonal:req.body.idPersonal,estado:"activo"}}).then(function (personal) {
                if(personal){
                    callback(null,personal);
                }else callback("personal no encontrado");
            });
        }
    ], function(err, results) {
        if(err){
            res.json(err)
        }else {
            return models.sequelize.transaction(function (t) {
                const alumno = results[0];
                const libro = results[1];
                const personal = results[2];
                return models.prestamo.create({
                    fechaReserva:Date.now(),
                    alumnoCodigo:alumno.codigo,
                    libroIsbn:libro.isbn,
                    personalIdPersonal:personal.idPersonal
                },{transaction: t}).then(function (prestamo) {
                    return alumno.update({estado:"operando"},{transaction: t}).then(function (alumno) {
                        return libro.update({estado:"reservado"},{transaction: t})
                    });
                })
            }).then(function (result) {
                res.json(result);
            }).catch(function (err) {
                res.json(err);
            });
        }
    });
});
router.patch('/entregar', function(req, res, next) {
    models.prestamo.findOne({where:{idPrestamo:req.body.idPrestamo}}).then(function (prestamo) {
        if(prestamo){
            prestamo.getAlumno().then(function (alumno) {
                prestamo.getLibro().then(function (libro) {
                    return models.sequelize.transaction(function (t) {
                        return prestamo.update({
                            fechaEntrega:Date.now(),
                            estado:"entregado"
                        },{transaction: t}).then(function (prestamo) {
                                return libro.update({estado:"prestado"},{transaction: t})
                        })
                    }).then(function (result) {
                        res.json(result);
                    }).catch(function (err) {
                        res.json(err);
                    });
                });
            });

        }else res.json("prestamo no encontrado");
    });
});
router.patch('/devolver', function (req, res, next) {
    models.prestamo.findOne({where: {idPrestamo: req.body.idPrestamo}}).then(function (prestamo) {
        if (prestamo) {
            prestamo.getAlumno().then(function (alumno) {
                prestamo.getLibro().then(function (libro) {
                    return models.sequelize.transaction(function (t) {
                        return prestamo.update({
                            fechaDevolucion: Date.now(),
                            estado         : "devuelto"
                        }, {transaction: t}).then(function (prestamo) {
                            return alumno.update({estado: "activo"}, {transaction: t}).then(function (alumno) {
                                return libro.update({estado: "disponible"}, {transaction: t})
                            });
                        })
                    }).then(function (result) {
                        res.json(result);
                    }).catch(function (err) {
                        res.json(err);
                    });
                });
            });
        } else res.json("prestamo no encontrado");
    });
});

module.exports = router;
