'use strict';
module.exports = function (sequelize, DataTypes) {
    var Listing = sequelize.define('Listing', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT
    });
    return Listing;
};