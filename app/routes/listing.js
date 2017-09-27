var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Listing.findAll().then(function (result) {
     res.json(result)
  });
});
router.post('/', function(req, res, next) {
    models.listing.create(req.body,{
        include: [{
            association: models.listing.User

        }]
    }).then(function (result) {
        res.json(result)
    });
});

module.exports = router;
