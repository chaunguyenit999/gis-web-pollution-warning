// const route = require('express').Router();
const { getData, updateData, insertData, data_partition} = require('../controllers/air');
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
}

module.exports = route