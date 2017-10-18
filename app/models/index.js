'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });


/**
 * Relaciones
 */
db.usuario.alumno = db.usuario.belongsTo(db.alumno);
db.usuario.personal = db.usuario.belongsTo(db.personal);

db.alumno.usuario = db.alumno.hasOne(db.usuario);
db.alumno.prestamos = db.alumno.hasMany(db.prestamo);

db.personal.usuario = db.personal.hasOne(db.usuario);
db.personal.prestamos = db.personal.hasMany(db.prestamo);

db.libro.prestamos = db.libro.hasMany(db.prestamo);

db.prestamo.alumno = db.prestamo.belongsTo(db.alumno);
db.prestamo.personal = db.prestamo.belongsTo(db.personal);
db.prestamo.libro = db.prestamo.belongsTo(db.libro);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
