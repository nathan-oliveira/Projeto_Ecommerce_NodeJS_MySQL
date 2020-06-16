'use strict'

exports.produtos = async (app, req, res, next) => {
  try {
    const conn = app.bin.keys();
    const produtoDAO = new app.src.models.client.ProdutoDAO(conn)
    produtoDAO.getAll((err, result) => {
      const timesDAO = new app.src.models.vendedor.TimesDAO(conn)
      timesDAO.getAll((err, times) => {
        res.render('client/produtos/produtos', {
          identification: req.session.loggedin,
          usuario: req.session.usuario,
          carrinho: (req.session.carrinho == 'undefined') ? [] : req.session.carrinho,
          cpf: req.session.cpf,
          url: process.env.URL,
          data: result,
          time: times
        })
      })
    })
  } catch (error) {
    next(error);
  }
}

exports.getProduto = async (app, req, res, next) => {
  try {
    const conn = app.bin.keys();
    const produtoDAO = new app.src.models.vendedor.ProdutoDAO(conn)
    produtoDAO.getById(req.params.id, (err, result) => {
      res.status(200).json(result)
    })
  } catch (error) {
    next(error);
  }
}