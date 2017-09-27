'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('user', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        bio: DataTypes.TEXT
    });
    return User;
};