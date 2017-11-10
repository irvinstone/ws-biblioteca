var express = require('express');
var router = express.Router();
var models = require('../models');
var async   = require('async');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.prestamo.findAll().then(function (response) {
     res.json(response);
  });
});
router.post('/', function(req, res, next) {
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
            models.prestamo.create().then(function (prestamo) {
                prestamo.setAlumno(results[0]);
                prestamo.setLibro(results[1]);
                prestamo.setPersonal(results[2]);
                prestamo.save().then(function (prestamo) {
                    res.json(prestamo);
                }).catch(function (err) {
                    res.json({err:err});
                })
            });
        }
    });
});

module.exports = router;
