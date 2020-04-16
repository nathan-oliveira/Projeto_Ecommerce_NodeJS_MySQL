'use strict'

function CategoriasDAO(connection) {
  this._connection = connection
}

CategoriasDAO.prototype.getAll = function (callback) {
  this._connection.query(`SELECT * FROM categoria`, callback)
}

CategoriasDAO.prototype.getDescricao = function (descricao, callback) {
  this._connection.query(`SELECT * FROM categoria WHERE descricao = ?`, [descricao], callback)
}

CategoriasDAO.prototype.getById = function (id, callback) {
  this._connection.query(`SELECT * FROM categoria WHERE id = ?`, [id], callback)
}

CategoriasDAO.prototype.delete = function (id, callback) {
  this._connection.query(`DELETE FROM categoria WHERE id = ?`, [id], callback)
}
CategoriasDAO.prototype.save = function (data, checker, callback) {
  if(checker === '0') {
    this._connection.query(`INSERT INTO categoria SET ?`, data, callback)
  } else {
    this._connection.query(`UPDATE categoria SET ? WHERE id = ?`, [data, checker], callback)
  }
}

module.exports = function () {
	return CategoriasDAO;
}
