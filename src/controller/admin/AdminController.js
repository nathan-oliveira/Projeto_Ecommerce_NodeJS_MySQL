'use strict'

exports.listar = async (app, req, res, next) => {
  const conn = app.bin.keys();
  const adminDAO = new app.src.models.admin.AdminDAO(conn)
  adminDAO.getAll((err, result) => {
    if(err) {
      res.json(err)
    } else {
      res.render('exemplo/listar', {
        identificadao: req.session.loggedin,
        usuario: req.session.usuario,
        cpf: req.session.cpf,
        url: process.env.URL,
        data: result
      })
    }
  })
}


