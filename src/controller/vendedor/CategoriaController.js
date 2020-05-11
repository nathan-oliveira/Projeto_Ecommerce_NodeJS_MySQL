'use strict'

module.exports.listar = async (app, req, res, next) => {
  try {
    res.render('vendedor/categorias/listar', {
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
    const categoriasDAO = new app.src.models.vendedor.CategoriasDAO(conn)
    categoriasDAO.getAll((err, result) => {
      const content = []
      if(result) {
        for (let i = 0; i < result.length; i++) {
          content.push({
            id: result[i].id,
            descricao: result[i].descricao
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
      descricao: req.body.nome
    }

    const conn = app.bin.keys();
    const categoriasDAO = new app.src.models.vendedor.CategoriasDAO(conn)
    categoriasDAO.getDescricao(req.body.nome, (err, desc) => {
      if(desc == '') {
        categoriasDAO.save(data, req.body.checker, (err, result) => {
          res.redirect(process.env.URL + '/categorias/cadastrar')
        })
      } else if(desc[0].descricao === req.body.nome) {
        res.render('vendedor/categorias/listar', {
          identification: req.session.loggedin,
          url: process.env.URL,
          usuario: req.session.usuario,
          checker: 0,
          erros: { existe: `Categoria "${req.body.nome}" já está cadastrado!` },
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
    const categoriasDAO = new app.src.models.vendedor.CategoriasDAO(conn);
    categoriasDAO.delete(req.params.id, function (err, result) {
      if (err) {
        res.status(200).json({ error: `Não foi possível excluir á Categoria, Motivo: 'Em uso!'` })
      } else {
        res.status(200).json({ error: null })
      }
    })
  } catch (error) {
    next(error);
  }
}