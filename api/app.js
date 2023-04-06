const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//mongoose.Promise = global.Promise;
const app = express();
app.use(bodyParser.json())
const port = 3000;
const db = require('./models/db')
const route = require('./routes/dataRoutes.js');

mongoose.set('strictQuery', false)
db.connect();
route(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});