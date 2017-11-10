'use strict';
module.exports = function (sequelize, DataTypes) {
    var Prestamo = sequelize.define('prestamo', {
        idPrestamo: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fechaReserva: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fechaEntrega: {
            type: DataTypes.DATE,
            allowNull: true
        },
        fechaDevolucion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        estado: {
            type: DataTypes.ENUM('reservado','entregado','devuelto'),
            allowNull: false,
            defaultValue: "reservado"
        }
    });
    return Prestamo;
};