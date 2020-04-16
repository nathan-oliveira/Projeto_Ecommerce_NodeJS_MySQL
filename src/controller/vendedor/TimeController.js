'use strict'

module.exports.listar = async (app, req, res, next) => {
  try {
    res.render('vendedor/times/listar', {
      identification: req.session.loggedin,
      url: process.env.URL,
      usuario: req.session.usuario,
      checker: 0,
      erros: {},
      data: {}
    })
  } catch (error) {
    next(error);
  }
}

module.exports.listar_datatable = async (app, req, res, next) => {
  try {
    const conn = app.bin.keys();
    const timesDAO = new app.src.models.client.TimesDAO(conn)
    timesDAO.getAll((err, result) => {
      const content = []
      if(result) {
        for (let i = 0; i < result.length; i++) {
          content.push({
            id: result[i].id,
            nome: result[i].nome
          })
        }
      }
      res.status(200).json({ data: content })
    })
  } catch (error) {
    next(error);
  }
}

module.exports.salvar = async (app, req, res, next) => {
  try {
    const data = {
      nome: req.body.nome
    }

    const conn = app.bin.keys();
    const timesDAO = new app.src.models.client.TimesDAO(conn)
    timesDAO.getTimes(req.body.nome, (err, times) => {
      if(times == '') {
        timesDAO.save(data, req.body.checker, (err, result) => {
          if(err) {
            res.json(err)
          } else {
            res.redirect(process.env.URL + '/times/cadastrar')
          }
        })
      } else if(times[0].nome === req.body.nome){
        res.render('vendedor/times/listar', {
          identification: req.session.loggedin,
          url: process.env.URL,
          usuario: req.session.usuario,
          checker: 0,
          erros: { existe: `Time "${req.body.nome}" já está cadastrado!` },
          data: req.body
        })
      }
    })
  } catch (error) {
    next(error);
  }
}

module.exports.excluir = async (app, req, res, next) => {
  try {
    const conn = app.bin.keys();
    const timesDAO = new app.src.models.client.TimesDAO(conn)
    timesDAO.getById(req.params.id, function (err, old) {
      timesDAO.delete(req.params.id, function (err, result) {
        if (err) {
          res.json(err)
        } else {
          res.redirect(process.env.URL + '/times/cadastrar')
        }
      })
    })
  } catch (error) {
    next(error);
  }
}