'use strict'

exports.produtos = async (app, req, res, next) => {
  try {
    const conn = app.bin.keys();
    const produtoDAO = new app.src.models.client.ProdutoDAO(conn)
    produtoDAO.getAll((err, result) => {
      console.log(result)
      res.render('client/produtos/produtos', {
        identification: req.session.loggedin,
        usuario: req.session.usuario,
        url: process.env.URL,
        data: result
      })
    })
  } catch (error) {
    next(error);
  }
}