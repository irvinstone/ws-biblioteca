var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var config = require('../config/config.json');
var models = require('../models');

function AuthenticationService() {
}

function generarToken(data, callback) {
    models.usuario.findOne({where: {email: data.email}}).then(function (usuario) {
        if (usuario) {
            if (usuario.password == crypto.createHash('sha256').update(data.password + config.token.secret).digest('hex')) {
                jwt.sign({
                    body: {id: usuario.id, email: usuario.email}
                }, config.token.secret, {
                    algorithm: 'HS256',
                    expiresIn: config.token.tiempoExpiracion
                }, function (err, token) {
                    usuario.email = null;
                    usuario.password = null;
                    var info = {
                        usuario: usuario,
                        token  : token
                    };
                    if (err) {
                        return callback(err);
                    } else {
                        return callback(null, info);
                    }
                });
            } else return callback("contraseña incorrecta");
        } else {
            return callback("este usuario no existe o esta suspendido");
        }

    });
}

function decodificarToken(token, callback) {
    jwt.verify(token, config.token.secret, function (err, data) {
        if (err) return callback("token invalido o expirado");
        else {
            models.usuario.findOne({where: {email: data.body.email}}).then(function (usuario) {
                if (usuario) return callback(null, usuario);
                else return callback("este usuario no existe o esta suspendido")
            });
        }
    });
}

function getAuthorizationHeader(headers, callback) {
    var auth = headers.get("Authorization");
    if (auth) {
        return callback(null, auth);
    } else return callback("no se encontro la autorizacion");
}

AuthenticationService.prototype.authenticar = function (data, callback) {
    generarToken(data, function (err, token) {
        if (err) {
            return callback(err);
        } else {
            return callback(null, token);
        }
    })
};

AuthenticationService.prototype.tieneAcceso = function (headers, callback) {
    getAuthorizationHeader(headers, function (err, token) {
        if (err) {
            return callback(err);
        } else {
            decodificarToken(token, function (err,response) {
                if(err)callback(err);
                else return callback(null, response)
            })
        }
    });
};

module.exports = new AuthenticationService();
