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
            type: DataTypes.ENUM('Disponible','Reservado','Prestado'),
            allowNull: false,
            defaultValue: "Disponible"
        },
        tipo: {
            type: DataTypes.ENUM('Fisico','Digital'),
            allowNull: false,
            defaultValue: "Fisico"
        },
        link: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    });
    return Libro;
};