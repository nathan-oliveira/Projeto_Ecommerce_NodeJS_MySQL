'use strict'

exports.listar = async (app, req, res, next) => {
  try {
    res.render('vendedor/produto/listar', {
      identification: req.session.loggedin,
      url: process.env.URL,
      usuario: req.session.usuario,
      cpf: req.session.cpf,
      checker: 0,
      erros: {},
      data: {}
    })
  } catch (error) {
    next(error);
  }
}

exports.listar_datatable = async (app, req, res, next) => {
  try {
    const conn = app.bin.keys();
    const produtoDAO = new app.src.models.vendedor.ProdutoDAO(conn)
    produtoDAO.getAll((err, result) => {
      const data = []
      if(result) {
        for (let i = 0; i < result.length; i++) {
          data.push({
            id: result[i].id,
            nome: result[i].nome,
            preco: result[i].preco,
            categoria: result[i].categoria,
            time: result[i].time
          })
        }
      }
      res.status(200).json({ data: data })
    })
  } catch (error) {
    next(error);
  }
}

exports.cadastrar = async (app, req, res, next) => {
  try {
    const conn = app.bin.keys();
    const categoriasDAO = new app.src.models.vendedor.CategoriasDAO(conn)
    categoriasDAO.getAll((err, categoria) => {
      const timeDAO = new app.src.models.vendedor.TimesDAO(conn)
      timeDAO.getAll((err, time) => {
        if(err) {
          res.json(err)
        } else {
          res.render('vendedor/produto/cadastrar', {
            identification: req.session.loggedin,
            url: process.env.URL,
            usuario: req.session.usuario,
            cpf: req.session.cpf,
            checker: 0,
            categoria: categoria,
            erros: {},
            time: time,
            data: {}
          })
        }
      })
    })
  } catch (error) {
    next(error);
  }
}

exports.editar = async (app, req, res, next) => {
  try {
    const conn = app.bin.keys();
    const produtoDAO = new app.src.models.vendedor.ProdutoDAO(conn)
    produtoDAO.getById(req.params.id, (err, result) => {
      const categoriasDAO = new app.src.models.vendedor.CategoriasDAO(conn)
      categoriasDAO.getAll((err, categoria) => {
        const timeDAO = new app.src.models.vendedor.TimesDAO(conn)
        timeDAO.getAll((err, time) => {
          if(err) {
            res.json(err)
          } else {
            res.render('vendedor/produto/cadastrar', {
              identification: req.session.loggedin,
              url: process.env.URL,
              usuario: req.session.usuario,
              cpf: req.session.cpf,
              checker: req.params.id,
              erros: {},
              categoria: categoria,
              time: time,
              data: result[0]
            })
          }
        })
      })
    })
  } catch (error) {
    next(error);
  }
}

exports.excluir = async (app, req, res, next) => {
  try {
    const conn = app.bin.keys();
    const ProdutoDAO = new app.src.models.vendedor.ProdutoDAO(conn)
    ProdutoDAO.getImgProd(req.params.id, function (err, imgs) {
      const imgId = (imgs[0].imagem_id).split(",");
      ProdutoDAO.deleteImgProd(req.params.id, function (err, dp) {
        ProdutoDAO.deleteImagem(imgId[0], req.params.id, "1", function (err, resultImg1) {
          ProdutoDAO.deleteImagem(imgId[1], req.params.id, "2", function (err, resultImg1) {
            ProdutoDAO.deleteImagem(imgId[2], req.params.id, "3", function (err, resultImg1) {
              ProdutoDAO.deleteProduto(req.params.id, function (err, resultProd) {
                if (err) {
                  res.json(err)
                } else {
                  res.redirect(process.env.URL + '/produtos/listar')
                }
              })
            })
          })
        })
      })
    })
  } catch (error) {
    next(error);
  }
}

exports.salvar = async (app, req, res, next, mult) => {
  try {
    const data = {
      nome: req.body.produto,
      descricao: req.body.descricao,
      preco: req.body.valor,
      categoria_id: req.body.categoria,
      time_id: req.body.time
    }

    req.assert('produto', 'Produto não pode ser vazio').notEmpty();
    req.assert('descricao', 'Descrição não pode ser vazio').notEmpty();
    req.assert('categoria', 'Categoria não pode ser vazio').notEmpty();
    req.assert('valor', 'Preço não pode ser vazio').notEmpty();

    if(req.body.checker == 0) {
      if(req.files.imagem1 == undefined)
        req.assert('imagem1', 'Imagem 1 não pode ser vazio').notEmpty();
      if(req.files.imagem2 == undefined)
        req.assert('imagem2', 'Imagem 2 não pode ser vazio').notEmpty();
      if(req.files.imagem3 == undefined)
        req.assert('imagem3', 'Imagem 3 não pode ser vazio').notEmpty();
    }

    var erros = req.validationErrors();

    if(mult == true) {
      if (erros) {
        erros.push({ msg: 'Formato de imagem invalido! Favor enviar no formato (PNG, JPG ou JPEG).' })
      } else {
        erros = [{ msg: 'Formato de imagem invalido! Favor enviar no formato (PNG, JPG ou JPEG).' }]
      }
    }

    const conn = app.bin.keys();
    if(erros) {
      const produtoDAO = new app.src.models.vendedor.ProdutoDAO(conn)
      produtoDAO.getById(req.body.checker, (err, result) => {
        let dados = result[0]
        const categoriasDAO = new app.src.models.vendedor.CategoriasDAO(conn)
        categoriasDAO.getAll((err, categoria) => {
          const timeDAO = new app.src.models.vendedor.TimesDAO(conn)
          timeDAO.getAll((err, time) => {
            if(err) {
              res.json(err)
            } else {
              res.render('vendedor/produto/cadastrar', {
                identification: req.session.loggedin,
                url: process.env.URL,
                usuario: req.session.usuario,
                cpf: req.session.cpf,
                checker: req.body.checker,
                erros: erros,
                categoria: categoria,
                time: time,
                data: dados
              })
            }
          })
        })
      })
    } else {
      if(req.body.checker == 0) {
        const img1 = { url: (req.files.imagem1[0].path+'').replace('public\\uploads\\',''), opcao: '1' }
        const img2 = { url: (req.files.imagem2[0].path+'').replace('public\\uploads\\',''), opcao: '2' }
        const img3 = { url: (req.files.imagem3[0].path+'').replace('public\\uploads\\',''), opcao: '3' }
        save(app, res, conn, req.body.checker, data, img1, img2, img3);
      } else {
        const img1 = [];
        const img2 = [];
        const img3 = [];

        const produtoDAO = new app.src.models.vendedor.ProdutoDAO(conn)
        produtoDAO.getById(req.body.checker, (err, result) => {
          if(req.files.imagem1 == undefined) {
            img1.push({ "url": result[0].url1, "opcao": '1' })
          } else {
            img1.push({ "url": (req.files.imagem1[0].path+'').replace('public\\uploads\\',''), "opcao": '1' });
          }

          if(req.files.imagem2 == undefined) {
            img2.push({ "url": result[0].url2, "opcao": '2' })
          } else {
            img2.push({ "url": (req.files.imagem2[0].path+'').replace('public\\uploads\\',''), "opcao": '2' });
          }

          if(req.files.imagem3 == undefined) {
            img3.push({ "url": result[0].url3, "opcao": '3' })
          } else {
            img3.push({ "url": (req.files.imagem3[0].path+'').replace('public\\uploads\\',''), "opcao": '3' });
          }

          save(app, res, conn, req.body.checker, data, img1[0], img2[0], img3[0]);
        })
      }
    }
  } catch (error) {
    next(error);
  }
}

function save(app, res, conn, checker, data, data1, data2, data3) {
  let idProduto;
  const produtoDAO = new app.src.models.vendedor.ProdutoDAO(conn)
  produtoDAO.save(data, checker, (err, produto) => {
    if(checker == "0") {
      idProduto = produto.insertId;
    } else {
      idProduto = checker;
    }
    produtoDAO.saveImg(data1, checker, idProduto, (err, callImg1) => {
      produtoDAO.saveImg(data2, checker, idProduto, (err, callImg2) => {
        produtoDAO.saveImg(data3, checker, idProduto, (err, callImg3) => {
          if(checker == "0") {
            produtoDAO.saveP1(callImg1.insertId, checker, produto.insertId, "1", (err, result) => {
              produtoDAO.saveP1(callImg2.insertId, checker, produto.insertId, "2", (err, result) => {
                produtoDAO.saveP1(callImg3.insertId, checker, produto.insertId, "3", (err, result) => {
                  if(err) {
                    res.json(err);
                  } else {
                    res.redirect(process.env.URL + '/produtos/listar')
                  }
                })
              })
            })
          } else {
            res.redirect(process.env.URL + '/produtos/listar')
          }
        })
      })
    })
  })
}
