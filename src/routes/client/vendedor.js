'use strict'

const { logado_vendedor } = require('../../../bin/access')
const { upload } = require('./../../middleware/multer')

module.exports = (app) => {
  // Categorias
  app.get('/categorias/cadastrar', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.CategoriaController.listar(app, req, res, next)
  })

  app.post('/categorias/cadastrar', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.CategoriaController.salvar(app, req, res, next)
  })

  app.get('/categorias/datatable', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.CategoriaController.listar_datatable(app, req, res, next)
  })

  app.get('/categorias/excluir/:id', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.CategoriaController.excluir(app, req, res, next)
  })

  // Times
  app.get('/times/cadastrar', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.TimeController.listar(app, req, res, next)
  })

  app.post('/times/cadastrar', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.TimeController.salvar(app, req, res, next)
  })

  app.get('/times/datatable', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.TimeController.listar_datatable(app, req, res, next)
  })

  app.get('/times/excluir/:id', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.TimeController.excluir(app, req, res, next)
  })

  // Produtos
  app.get('/produtos/listar', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.ProdutoController.listar(app, req, res, next)
  })

  app.get('/produtos/datatable', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.ProdutoController.listar_datatable(app, req, res, next)
  })

  app.get('/produtos/cadastrar', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.ProdutoController.cadastrar(app, req, res, next)
  })

  app.post('/produto/salvar', logado_vendedor, (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        app.src.controller.vendedor.ProdutoController.salvar(app, req, res, next, true)
      } else {
        app.src.controller.vendedor.ProdutoController.salvar(app, req, res, next, false)
      }
    })
  })

  app.get('/produto/editar/:id', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.ProdutoController.editar(app, req, res, next)
  })

  app.get('/produto/excluir/:id', logado_vendedor, (req, res, next) => {
    app.src.controller.vendedor.ProdutoController.excluir(app, req, res, next)
  })
}
