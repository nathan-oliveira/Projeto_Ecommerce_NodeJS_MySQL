'use strict'

function UsuarioDAO (connection) {
  this._connection = connection
}

UsuarioDAO.prototype.getAll = function (callback) {
  this._connection.query('SELECT * FROM usuario', callback);
}

module.exports = function () {
  return UsuarioDAO
}
