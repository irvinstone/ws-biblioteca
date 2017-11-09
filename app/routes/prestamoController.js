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
            models.alumno.findById(req.body.codigo).then(function (alumno) {
                if(alumno){
                    callback(null,alumno);
                }else callback("alumno no encontrado");
            });
        },
        function(callback) {
            models.libro.findById(req.body.isbn).then(function (libro) {
                if(libro){
                    callback("fuck ur selve",libro);
                }else callback("libro no encontrado");
            });
        },
        function (callback) {
            models.personal.findById(req.body.idPersonal).then(function (personal) {
                if(personal){
                    callback(null,personal);
                }else callback("personal no encontrado");
            });
        }
    ], function(err, results) {
        if(err){
            res.json(err)
        }else res.json(results);
    });
});

module.exports = router;
