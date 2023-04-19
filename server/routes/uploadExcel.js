const {Uploadfiles, ShowData} = require("../controllers/upload")
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
    app.post('/upload',upload.single('excel') ,Uploadfiles)
    app.get('/upload', ShowData)
}

module.exports = Upload