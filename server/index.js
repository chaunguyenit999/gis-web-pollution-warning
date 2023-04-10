// LIBARIES
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require('morgan');
const bodyparser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

// MODULES
const connectDB = require("./configs/database");
const initWebRoute = require("./routes/web");
const initAPIRoute = require("./routes/api");
const app = express();
const PORT = process.env.PORT || 8080;

// PORT
dotenv.config({ path: "config.env" });

// MONGODB CONNECTION
connectDB();

// USE MIDDLEWARE LIBARIES
app.use(morgan('combined')); // log requests in terminal
app.use(bodyparser.json()); // converts the request into an object which is called 'body.req'
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet()); // Defender HTTP headers
app.use(cors()); // allow sharing of resources between websites

// SETUP VIEW ENGINE
app.use(expressLayouts); // using express-ejs-layouts libary
app.set("view engine", "ejs"); // using ejs template engine
app.set("views", path.resolve(__dirname, "views")); // Set views foler path
app.use(express.static(path.resolve(__dirname, "assets"))); // load assets

// LOAD ROUTES
initWebRoute(app); // web routes
initAPIRoute(app); // api routes

// SERVER RUNNING
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
