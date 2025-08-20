const multer = require("multer")

module.exports = () => {
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/upload');
    },
    filename: function(req, file, cb) {
      const uniqueSuffix = Date.now() ;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });
  return storage ;
}