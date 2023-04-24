const checked = require("../controllers/duplicate")

const deleteDups = (app) =>{
    app.get('/deleteDups', checked)
}
module.exports = deleteDups