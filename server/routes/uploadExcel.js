const {Uploadfiles, ShowData} = require("../controllers/upload")
const multer     = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/Users/Admin/Documents/NCKH/DATA/2019/Không khí')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
var upload = multer({ storage: storage });

const Upload = (app) =>{
    app.post('/upload',Uploadfiles)
    app.get('/upload', ShowData)
}

module.exports = Upload