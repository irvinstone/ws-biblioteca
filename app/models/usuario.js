'use strict';
module.exports = function (sequelize, DataTypes) {
    var Usuario = sequelize.define('usuario', {
        username: {
            type:DataTypes.STRING,
            unique: true
        },
        email: {
            type:DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        tipo: {
            type: DataTypes.ENUM('personal','alumno'),
            allowNull: false,
            defaultValue: "alumno"
        }
    });
    return Usuario;
};