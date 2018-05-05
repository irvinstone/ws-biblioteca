var express = require('express');
var router = express.Router();
var models = require('../models');
var authMiddleware = require('./authMiddleware');

/* GET users listing. */
// router.post('/crear', paperworkk.accept(validations.templates.crear),authMiddleware.ensureAthenticated, function(req, res, next) {
// router.get('/',authMiddleware.ensureAthenticated, function(req, res, next) {
router.get('/', function(req, res, next) {
    console.log(req.query);
    models.libro.findAll({where:req.query}).then(function (result) {
     res.json(result)
  });
});
router.post('/', function(req, res, next) {
    models.libro.create(req.body).then(function (result) {
        res.json(result)
    });
});

module.exports = router;
