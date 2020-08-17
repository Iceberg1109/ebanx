const express = require("express");
const bodyParser = require("body-parser");
// Cors
const cors = require("cors");

const routes = require("./routes/main.route.js");

const app = express();

// Body parser middleware
app.use(express.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 500000,
  })
);

// CORS
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// User Routes
app.use("/", routes);

// The variable for account data, should be changed to the database in the live mode
global.accounts = [];

// either use port 5000 (dev) or the environment variable for PORT (when putting on a live server)
const port = process.env.PORT || 5001;
const host = process.env.HOST || "0.0.0.0";

// Start the server on the selected port
app.listen(port, host, () => console.log(`Server running on port ${port}`));
