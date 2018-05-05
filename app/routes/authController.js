var express = require('express');
var router = express.Router();
var usuarioService = require('../services/AuthService');

router.post('/', function(req, res, next) {
    usuarioService.authenticar(req.body,function (err,success) {
        if(err)res.json(err);
        else res.json(success);
    })
});
router.post('/access', function(req, res, next) {
    usuarioService.tieneAcceso(req,function (err,success) {
        if(err)res.json(err);
        else res.json(success);
    })
});

module.exports = router;
