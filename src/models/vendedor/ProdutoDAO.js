'use strict'

function ProdutoDAO(connection) {
  this._connection = connection
}

ProdutoDAO.prototype.getAll = function (callback)  {
  const sql = `SELECT  p.id as id, p.nome, c.descricao as categoria, p.descricao, p.preco, t.nome as time 
  FROM produto p, time t, categoria c WHERE p.time_id = t.id AND c.id = p.categoria_id`

  this._connection.query(sql, callback)
}

ProdutoDAO.prototype.getById = function (id, callback) {
  const sql = `SELECT  p.id as id, p.nome, p.categoria_id as categoria, p.descricao, p.preco, t.nome as time, p.time_id, 
  (SELECT url FROM imagem i, produto_imagem pi WHERE i.id = pi.imagem_id and i.opcao = "1" AND pi.produto_id = "${id}") as url1, 
  (SELECT url FROM imagem i, produto_imagem pi WHERE i.id = pi.imagem_id and i.opcao = "2" AND pi.produto_id = "${id}") as url2, 
  (SELECT url FROM imagem i, produto_imagem pi WHERE i.id = pi.imagem_id and i.opcao = "3" AND pi.produto_id = "${id}") as url3 
  FROM produto p, time t, categoria c WHERE p.time_id = t.id AND c.id = p.categoria_id AND p.id = "${id}";`

  this._connection.query(sql, [id], callback)
}

ProdutoDAO.prototype.save = function (data, checker, callback) {
  if(checker === '0') {
    const sql = `INSERT INTO produto SET ?`
    this._connection.query(sql, data, callback)
  } else {
    const sql = `UPDATE produto SET ? WHERE id = ?`
    this._connection.query(sql, [data, checker], callback)
  }
}

ProdutoDAO.prototype.saveImg = function (data, checker, id, callback) {
  if(checker === '0') {
    const sql = `INSERT INTO imagem SET url = ?, opcao = ?, produtos = ?`
    this._connection.query(sql, [data.url, data.opcao, id], callback)
  } else {
    const sql = `UPDATE imagem SET url = ? WHERE produtos = ? AND opcao = ?`
    this._connection.query(sql, [data.url, id, data.opcao], callback)
  }
}

ProdutoDAO.prototype.saveP1 = function (callbackImg, checker, prodId, opcao, callback) {
  if(checker === '0') {
    const sql = `INSERT INTO produto_imagem SET imagem_id = ?, produto_id = ?, opcao = ?;`
    this._connection.query(sql, [callbackImg, prodId, opcao], callback)
  } else {
    const sql = `UPDATE produto_imagem SET imagem_id = ? WHERE produto_id = ?, opcao = ?;`
    this._connection.query(sql, [callbackImg, checker, opcao], callback)
  }
}

ProdutoDAO.prototype.getImgProd = function (id, callback)  {
  const sql = `SELECT GROUP_CONCAT(imagem_id) as imagem_id FROM produto_imagem WHERE produto_id = ?`
  this._connection.query(sql, [id], callback)
}

ProdutoDAO.prototype.deleteImgProd = function (id, callback) {
  this._connection.query(`DELETE FROM produto_imagem WHERE produto_id = ?`, [id], callback)
}

ProdutoDAO.prototype.deleteImagem = function (img, id, opcao, callback) {
  this._connection.query(`DELETE FROM imagem WHERE id = ? and produtos = ? and opcao = ?;`, [img, id, opcao], callback)
}

ProdutoDAO.prototype.deleteProduto = function (id, callback) {
  this._connection.query(`DELETE FROM produto WHERE id = ?;`, [id], callback)
}

ProdutoDAO.prototype.verifyCategoria = function (callback) {
  this._connection.query(`SELECT categoria_id FROM produto GROUP BY (categoria_id);`, callback)
}

module.exports = function () {
	return ProdutoDAO;
}