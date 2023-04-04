const router = require('express').Router();
const { getAll, getOne, deleteOne, update, update2, insert, insert2} = require('../controller/dataController.js');


function route(app) {
    app.get('/getall', getAll);

    app.get('/getone/:add', getOne);

    app.post('/deleteone/:id', deleteOne);

    app.get('/update/:id', update);
    app.post('/update2/:id', update2);

    app.get('/insert', insert);
    app.post('/insert2', insert2);  
}

module.exports = route


//ejs