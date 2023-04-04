const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;
const db = require('./db.js');
const route = require('./routes/dataRoutes.js');

mongoose.set('strictQuery', false)
db.connect();


route(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});