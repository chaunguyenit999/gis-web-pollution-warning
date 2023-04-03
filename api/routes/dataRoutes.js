const router = require('express').Router();
const { getAllData, getAData, deleteAData, addAData } = require('../controller/dataController.js');
const path = require('path');

function route(app) {
    app.get('/getalldata', getAllData);
    app.get('/getadata', getAData);
    app.post('/addadata', addAData);
    app.get('/deleteadata', deleteAData);  
}

module.exports = route