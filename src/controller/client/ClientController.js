'use strict'

exports.carrinho = async (app, req, res, next) => {
  try {
    res.render('client/carrinho/carrinho', {
      identification: req.session.loggedin,
      url: process.env.URL,
      usuario: req.session.usuario,
      data: {}
    })
  } catch (error) {
    next(error);
  }
}

exports.carrinho_datatable = async (app, req, res, next) => { 
  try {
    const conn = app.bin.keys();
  } catch (error) {
    next(error);
  }
}

exports.minhasCompras = async (app, req, res, next) => {
  try {
    res.render('client/minhasCompras/minhasCompras', {
      identification: req.session.loggedin,
      usuario: req.session.usuario,
      url: process.env.URL,
      data: {}
    })
  } catch (error) {
    next(error);
  }
}

exports.perfil = async (app, req, res, next) => {
  try {
    const conn = app.bin.keys();
    const clientDAO = new app.src.models.client.ClientDAO(conn)
    clientDAO.getByCPF(req.session.cpf, (err, result) => {
      res.render('client/perfil/perfil', {
        identification: req.session.loggedin,
        usuario: req.session.usuario,
        url: process.env.URL,
        data: {}
      })
    })
  } catch (error) {
    next(error);
  }
}

exports.contaEditar = async (app, req, res, next) => {
  try {
    res.render('client/perfil/editar', {
      identification: req.session.loggedin,
      usuario: req.session.usuario,
      url: process.env.URL,
      data: {}
    })
  } catch (error) {
    next(error);
  }
}