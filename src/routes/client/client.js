'use strict'

const { logado_cliente } = require('../../../bin/access')

module.exports = (app) => {
  app.get('/', (req, res, next) => {
    app.src.controller.client.ProdutoController.produtos(app, req, res, next)
  })

  app.get('/produto/:id', (req, res, next) => {
    app.src.controller.client.ProdutoController.getProduto(app, req, res, next)
  })

  app.get('/carrinho', (req, res, next) => {
    app.src.controller.client.ClientController.carrinho(app, req, res, next)
  })

  app.post('/carrinho/add', (req, res, next) => {
    app.src.controller.client.ClientController.addCarrinho(app, req, res, next)
  })

  app.get('/minhas-compras', logado_cliente, (req, res, next) => {
    app.src.controller.client.ClientController.minhasCompras(app, req, res, next)
  })

  app.get('/minha-conta', logado_cliente, (req, res, next) => {
    app.src.controller.client.ClientController.perfil(app, req, res, next)
  })

  app.get('/conta/editar', logado_cliente, (req, res, next) => {
    app.src.controller.client.ClientController.contaEditar(app, req, res, next)
  })

  
}