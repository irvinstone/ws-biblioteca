var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll().then(function (users) {
     res.json(users)
  });
});
router.post('/', function(req, res, next) {
    models.User.create(req.body).then(function (result) {
        res.json(result)
    });
});

module.exports = router;
