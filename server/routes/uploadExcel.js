const {Uploadfiles, ShowData, Import} = require("../controllers/upload")
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
    app.post('/showdata',upload.single('excel') , ShowData)
    app.get('/upload', Uploadfiles)
    app.get('/import', Import)
}

module.exports = Upload