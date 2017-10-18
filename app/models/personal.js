'use strict';
module.exports = function (sequelize, DataTypes) {
    var Personal = sequelize.define('personal', {
        idPersonal: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
            allowNull: true
        },
        celular: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        telefono: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        cargo: {
            type: DataTypes.ENUM('Administrador','Personal'),
            allowNull: false
        }
    });
    return Personal;
};