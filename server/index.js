const express = require("express");
const dotenv = require("dotenv")
const cron = require('node-cron');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const methodOverride = require('method-override')
// ROUTES
const Upload = require(".//routes/uploadExcel")
// MODULES
const configViewEngine = require("./configs/viewEngine");
const connectDB = require("./configs/database");
const app = express();
const PORT = process.env.PORT || 3000;
// PORT

const removeDuplicates = require("./controllers/duplicate")
const getWeather = require("./controllers/ApiWeather")

dotenv.config({path: 'config.env'});

// MONGODB CONNECTION
connectDB();
// RUN UPDATE DATA API
cron.schedule('12  * * * *', () => {
  console.log('running 12 hours');
  getWeather()
},{
  scheduled:true,
  timezone:"Asia/Ho_Chi_Minh"
});
cron.schedule('1 * * * * *', () => {
  console.log('delete');
  removeDuplicates()
},{
  scheduled:true,
  timezone:"Asia/Ho_Chi_Minh"
});
// USE MIDDLEWARE LIBARIES
app.use(morgan('combined')); // log requests in terminal
app.use(methodOverride('_method'))
app.use(bodyparser.json()); // converts the request into an object which is called 'body.req'
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet()); // Defender HTTP headers
app.use(cors()); // allow sharing of resources between websites

// SETUP VIEW ENGINE
configViewEngine(app);
// apiWeather(app)
Upload(app)


// LOAD ROUTES


// SERVER RUNNING
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});