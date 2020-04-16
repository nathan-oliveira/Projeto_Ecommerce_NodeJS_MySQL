'use strict'
// const produtosController = require('../../controller/admin/AdminController');

module.exports = (app) => {
    app.use('/owner', (req, res) => {
        app.src.controller.admin.AdminController.listar(app, req, res)
        // produtosController.listar(app, req, res)
    })
}