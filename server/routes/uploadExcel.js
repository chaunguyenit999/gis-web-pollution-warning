const {Uploadfiles, Import, ReadExcel} = require("../controllers/upload")
const multer     = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../../../NCKH/DATA/2018/Không khí')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
var upload = multer({ storage: storage });

const Upload = (app) =>{
    app.get('/upload', Uploadfiles)
    app.get('/import', Import)
    app.post('/read' , upload.single('excel'), ReadExcel)
}

module.exports = Upload