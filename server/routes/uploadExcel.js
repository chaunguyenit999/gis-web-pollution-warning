const {Uploadfiles, Import, ReadExcelAir} = require("../controllers/upload")
const multer     = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../../NCKH/DATA/2018/Nước_Đất')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
var upload = multer({ storage: storage });

const Upload = (app) =>{
    app.get('/upload', Uploadfiles)
    app.get('/import', Import)
    app.post('/readAir' , upload.single('excel'), ReadExcelAir)
}

module.exports = Upload