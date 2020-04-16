'use strict'

function ClientDAO(connection) {
  this._connection = connection
}

ClientDAO.prototype.getByCPF = function (cpf, callback) {
  const sql = `SELECT usuario.cpf, usuario.nome, usuario.email, usuario.senha, usuario.dt_nascimento, usuario.time_id, endereco.tipo_logradouro, endereco.logradouro, endereco.numero, endereco.cidade, endereco.estado, endereco.cep, endereco.complemento, endereco.descricao FROM usuario, endereco, endereco_usuario WHERE endereco_usuario.endereco_id = id AND endereco_usuario.usuario_cpf = usuario.cpf AND usuario.cpf = ?`
  this._connection.query(sql, [cpf], callback)
}

module.exports = function () {
	return ClientDAO;
}
