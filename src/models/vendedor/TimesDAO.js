'use strict'

function TimesDAO(connection) {
  this._connection = connection
}

TimesDAO.prototype.getAll = function (callback) {
  this._connection.query(`SELECT * FROM time`, callback)
}

TimesDAO.prototype.getTimes = function (nome, callback) {
  this._connection.query(`SELECT * FROM time WHERE nome = ?`, [nome], callback)
}

TimesDAO.prototype.getById = function (id, callback) {
  this._connection.query(`SELECT * FROM time WHERE id = ?`, [id], callback)
}

TimesDAO.prototype.delete = function  (id, callback) {
  this._connection.query(`DELETE FROM time WHERE id = ?`, [id], callback)
}

TimesDAO.prototype.save = function (data, checker, callback) {
  if(checker === '0') {
    this._connection.query(`INSERT INTO time SET ?`, data, callback)
  } else {
    this._connection.query(`UPDATE categoria time ? WHERE id = ?`, [data, checker], callback)
  }
}

module.exports = function () {
	return TimesDAO;
}
