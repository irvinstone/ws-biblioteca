var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.user.findAll().then(function (users) {
     res.json(users)
  });
});
router.post('/', function(req, res, next) {
    console.log(req.body);
    models.user.create(req.body,{
        include: [{
            model: models.user.listing

        }]
    }).then(function (result) {
        res.json(result)
    });
});

module.exports = router;
