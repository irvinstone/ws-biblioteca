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
            type: DataTypes.ENUM('femenino','masculino'),
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('activo','suspendido','inactivo'),
            allowNull: false,
            defaultValue: "activo"
        }

    },{
        timestamp:false
    });
    return Alumno;
};