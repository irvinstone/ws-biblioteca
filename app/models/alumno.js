'use strict';
module.exports = function (sequelize, DataTypes) {
    var Alumno = sequelize.define('alumno', {
        codigo: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        nombres: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        genero: {
            type: DataTypes.ENUM('Femenino','Masculino'),
            allowNull: false
        }

    });
    return Alumno;
};