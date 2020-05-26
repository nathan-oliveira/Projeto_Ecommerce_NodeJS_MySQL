'use strict'

module.exports = (app) => {
    app.get('/', (req, res, next) => {
        app.src.controller.auth.AuthController.index(app, req, res, next)
    })

    app.get('/login', (req, res, next) => {
        app.src.controller.auth.AuthController.login(app, req, res, next)
    })

    app.post('/login', (req, res, next) => {
        app.src.controller.auth.AuthController.entrar(app, req, res, next)
    })

    app.get('/logout', (req, res, next) => {
        app.src.controller.auth.AuthController.logout(app, req, res, next)
    })

    app.get('/cadastrar', (req, res, next) => {
        app.src.controller.auth.AuthController.cadastrar(app, req, res, next)
    })

    app.post('/cadastrar', (req, res, next) => {
        app.src.controller.auth.AuthController.salvar(app, req, res, next)
    })
}