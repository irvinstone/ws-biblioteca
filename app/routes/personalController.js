var express = require('express');
var router = express.Router();
var models = require('../models');
var config = require('../config/config.json');
var crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.personal.findAll({where:req.query}).then(function (users) {
     res.json(users)
  });
});
router.post('/', function(req, res, next) {
    console.log(req.body);
    req.body.usuario.password = crypto.createHash('sha256').update(req.body.usuario.password + config.token.secret).digest('hex');
    models.personal.create(req.body,{
        include: [{
            association: models.personal.usuario
        }]
    }).then(function (result) {
        res.json(result)
    });
});

module.exports = router;
