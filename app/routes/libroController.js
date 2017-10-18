var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.libro.findAll().then(function (result) {
     res.json(result)
  });
});
router.post('/', function(req, res, next) {
    models.libro.create(req.body).then(function (result) {
        res.json(result)
    });
});

module.exports = router;
