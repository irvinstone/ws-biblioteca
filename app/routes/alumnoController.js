var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.libro.findAll({where:req.query}).then(function (users) {
     res.json(users)
  });
});
router.post('/', function(req, res, next) {
    console.log(req.body);
    models.alumno.create(req.body,{
        include: [{
            association: models.alumno.usuario
        }]
    }).then(function (result) {
        res.json(result)
    });
});

module.exports = router;
