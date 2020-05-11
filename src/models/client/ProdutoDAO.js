'use strict'

function ProdutoDAO(connection) {
  this._connection = connection
}

ProdutoDAO.prototype.getAll = function (callback) {
  const sql = `SELECT p.id as id, p.nome, left(p.descricao, 47) as descricao, p.preco,
  (SELECT url FROM imagem i, produto_imagem pi WHERE i.id = pi.imagem_id and i.opcao = "1" AND pi.produto_id = p.id) as imagem FROM produto p, time t, categoria c WHERE p.time_id = t.id AND c.id = p.categoria_id`
  this._connection.query(sql, callback)
}

module.exports = function () {
	return ProdutoDAO;
}