'use strict'
var hash = require('password-hash');

exports.index = async (app, req, res, next) => {
  res.render('index', {
    identification: req.session.loggedin,
    usuario: req.session.usuario,
    url: process.env.URL,
  });
}

exports.login = async (app, req, res, next) => {
  try {
    res.render('auth/login', {
      identification: req.session.loggedin,
      usuario: req.session.usuario,
      url: process.env.URL,
      erros: {}
    })
  } catch (error)  {
    next(error);
  }
}

exports.logout = async (app, req, res, next) => {
  try {
    req.session.identificadao = null
    req.session.usuario = null
    req.session.loggedin = false;
    req.session.destroy();
    res.redirect(process.env.url + '/')
  } catch (error) {
    next(error);
  }
}

exports.entrar = async (app, req, res, next) => {
  try {
    const cpf = req.body.cpf
    const senha = req.body.senha

    const conn = app.bin.keys();
    const authDAO = new app.src.models.auth.AuthDAO(conn)
    authDAO.getByCPF(cpf, (err, result) => {
      if (result != '') {
        if(err) {
          res.json(err)
        } else {
          if(cpf === result[0].cpf && hash.verify(senha, result[0].senha)) {
            req.session.loggedin = true;
            req.session.cpf = result[0].cpf;
            req.session.usuario = result[0].admin;
            if(result[0].admin === 0 || result[0].admin === 1) {
              res.redirect(process.env.url + '/');
            } else if(result[0].admin === 2){
              res.redirect(process.env.url + '/owner');
            }
          } else {
            req.session.loggedin = false;
            req.session.cpf = '';
            req.session.usuario = '';
            res.render('auth/login', {
              identification: req.session.loggedin,
              usuario: req.session.usuario,
              url: process.env.URL,
              erros: { validacao: 'CPF ou Senha inválidas!' }
            })
          }
        }
      } else {
        req.session.loggedin = false;
        req.session.cpf = '';
        req.session.usuario = '';
        res.render('auth/login', {
          identification: req.session.loggedin,
          usuario: req.session.usuario,
          url: process.env.URL,
          erros: { validacao: 'CPF ou Senha Incorreto!' }
        })
      }
    })
  } catch (error) {
    next(error);
  }
}

exports.cadastrar = async (app, req, res, next) => {
  try{
    const conn = app.bin.keys();
    const authDAO = new app.src.models.auth.AuthDAO(conn)
    authDAO.times((err, times) => {
      if(err) {
        res.json(err)
      } else {
        res.render('auth/cadastrar', {
          identification: req.session.loggedin,
          usuario: req.session.usuario,
          url: process.env.URL,
          times: times,
          erros: {},
          data: {},
          checker: 0
        })
      }
    })
  } catch (error) {
    next(error);
  }
}

exports.salvar = async (app, req, res, next) => {
  try {
    const data = {
      nome: req.body.nome,
      dt_nascimento: FormataStringData(req.body.dt_nascimento),
      cpf: req.body.cpf,
      email: req.body.email,
      senha: hash.generate(req.body.senha),
      // time_id: req.body.time
    }

    const conn = app.bin.keys();
    const authDAO = new app.src.models.auth.AuthDAO(conn)
    if(req.body.senha == req.body.confirma_senha) {
      authDAO.getByCPF(req.body.cpf, (err, validaCPF) => {
        if(validaCPF == '') {
          authDAO.save(data, req.body.checker, (err, result) => {
            if(err) {
              res.json(err)
            } else {
              res.redirect(process.env.URL + '/login')
            }
          })
        } else {
          authDAO.times((err, times) => {
            res.render('auth/cadastrar', {
              identification: req.session.loggedin,
              usuario: req.session.usuario,
              url: process.env.URL,
              times: times,
              erros: {cpf: "CPF informado já está cadastrado!"},
              data: req.body,
              checker: 0
            })
          })
        }
      })
    } else {
      authDAO.times((err, times) => {
        res.render('auth/cadastrar', {
          identification: req.session.loggedin,
          usuario: req.session.usuario,
          url: process.env.URL,
          times: times,
          erros: {validacao: "Campos 'Senha', 'Confirmação' estão diferentes!"},
          data: req.body,
          checker: 0
        })
      })
    }
  } catch (error) {
    next(error);
  }
}

function FormataStringData(data) {
  var dia  = data.split("/")[0];
  var mes  = data.split("/")[1];
  var ano  = data.split("/")[2];

  return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
}
