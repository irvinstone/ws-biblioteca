'use strict';
module.exports = function (sequelize, DataTypes) {
    var Listing = sequelize.define('listing', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT
    });
    return Listing;
};