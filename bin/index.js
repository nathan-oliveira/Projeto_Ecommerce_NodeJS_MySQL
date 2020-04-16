'use strict'

// Chamando modulos
require('dotenv').config()
const express = require('express');
const session = require('express-session');
const consign = require('consign')
const bp = require('body-parser');
var expressValidator = require('express-validator');
const { error_404 } = require('./access')

// Criando aplicação
const app = express();

// Configurando os middlewares
app.use(session({
  secret: 'ssshhhhh',
  name: 'zzzzxxxx',
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  }
}));

// configurando engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bp.json({limit: '10mb'}));
app.use(bp.urlencoded({ extended: true }));
app.use(expressValidator());

// definindo arquivos estaticos
app.use(express.static('public'));

// efetua o autoload para o objeto server
consign()
  .include('src/routes')
  .then('bin/keys.js')
  .then('src/models')
  .then('src/controller')
  .into(app)

// manipulacao de rotas inexistente - 404
app.use(function(req, res, next) {
  error_404(req, res, next)
});

// exportando aplicação
module.exports = app;