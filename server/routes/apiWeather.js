const axios = require('axios');

function apiWeather(app) {
    app.get('/apiweather', async (req, res) => {
        const { city } = req.query;
      
        const url = `http://api.weatherapi.com/v1/current.json?key=517d7a89bee7468699261933230304&q=${city}`;
      
        try {
          const response = await axios.get(url);
          res.send(response.data);
        } catch (error) {
          res.status(404).send(`${city} is not found`);
        }
      })
}

module.exports = apiWeather