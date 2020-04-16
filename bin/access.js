'use strict'

module.exports = {
  error_404(req, res, next) {
    return error404(req, res, next)
  },
  logado_cliente(req, res, next) {
    if (req.session.loggedin && req.session.usuario === 0) {
      return next();
    } else {
      error404(req, res, next)
    }
  },

  logado_vendedor(req, res, next) {
    if (req.session.loggedin && req.session.usuario === 1) {
      return next();
    } else {
      error404(req, res, next)
    }
  },

  logado_owner(req, res, next) {
    if (req.session.loggedin && req.session.usuario === 2) {
      return next();
    } else {
      error404(req, res, next)
    }
  }
}

function error404(req, res, next) {
  return res.render('error/error404', {
    identification: req.session.loggedin,
    usuario: req.session.usuario,
    url: process.env.URL,
  });
}