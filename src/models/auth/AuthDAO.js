'use strict'

function AuthDAO(connection) {
  this._connection = connection
}

AuthDAO.prototype.getByCPF = function (cpf, callback) {
  this._connection.query(`SELECT * FROM usuario WHERE cpf = ?`, cpf, callback);
}

AuthDAO.prototype.times = function (callback) {
  this._connection.query(`SELECT * FROM time`, callback)
}

AuthDAO.prototype.save = function (content, checker, callback) {
  if(checker === '0') {
    this._connection.query(`INSERT INTO usuario SET ?`, content, callback)
  } else {
    this._connection.query(`UPDATE usuario SET ? WHERE id = ?`, [content, checker], callback)
  }
}

module.exports = function () {
  return AuthDAO
}
