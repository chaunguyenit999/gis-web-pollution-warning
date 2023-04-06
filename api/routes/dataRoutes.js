<<<<<<< HEAD
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
=======
// const route = require('express').Router();
const { getData, updateData, insertData, data_partition} = require('../controller/dataController.js');
const axios = require('axios');


function route(app) {
    app.get('/data', getData);
    app.get('/update', updateData)
    app.get('/insert', insertData);
    app.get('/apiweather', async (req, res) => {
        const { city } = req.query;
      
        const url = `http://api.weatherapi.com/v1/current.json?key=517d7a89bee7468699261933230304&q=${city}`;
      
        try {
          const response = await axios.get(url);
          res.send(response.data);
        } catch (error) {
          res.status(404).send(`${city} is not found`);
        }
      });
    app.get('/datapartition', data_partition)
>>>>>>> long
}

module.exports = route


//ejs