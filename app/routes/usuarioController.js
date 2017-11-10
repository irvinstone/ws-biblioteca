var express = require('express');
var router = express.Router();
var models = require('../models');
var config = require('../config/config.json');
var crypto = require('crypto');
var usuarioService = require('../services/UserService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.usuario.findAll({where:req.query}).then(function (users) {
     res.json(users)
  });
});
router.post('/', function(req, res, next) {
    req.body.password = crypto.createHash('sha256').update(req.body.password + config.token.secret).digest('hex');
    models.usuario.create(req.body).then(function (result) {
        res.json(result)
    });
});
router.post('/auth', function(req, res, next) {
    usuarioService.authenticar(req.body,function (err,success) {
        if(err)res.json(err);
        else res.json(success);
    })
});

module.exports = router;
