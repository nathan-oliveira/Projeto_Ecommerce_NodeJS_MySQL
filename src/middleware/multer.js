const multer = require('multer')
const uuid = require('uuid/v4');

const MIME_TYPE_MAP = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg' };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let erros = new Error('Invalid mime type');
    if (isValid) {
      erros = null;
    }
    cb(erros, './public/uploads/');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLocaleLowerCase().trim();
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, 'produto-'+uuid()+'.'+ext);
  }
});

const upload = multer({ storage: storage }).fields([{name: 'imagem1', maxCount: 1},{name: 'imagem2', maxCount: 1}, {name: 'imagem3', maxCount: 1}]);

module.exports = { upload }