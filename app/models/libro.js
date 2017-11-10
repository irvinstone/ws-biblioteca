'use strict';
module.exports = function (sequelize, DataTypes) {
    var Libro = sequelize.define('libro', {
        isbn: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        estado: {
            type: DataTypes.ENUM('disponible','reservado','prestado','baja'),
            allowNull: false,
            defaultValue: "disponible"
        },
        tipo: {
            type: DataTypes.ENUM('fisico','digital'),
            allowNull: false,
            defaultValue: "fisico"
        },
        link: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    });
    return Libro;
};