const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const figlet = require("figlet");
require("dotenv").config();
const process = require("process");

const app = express();

var corsOptions = {
  origin: "http://localhost:80",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./src/routes/routes.js")(app);

const PORT = process.env.API_PORT || 80;
app.listen(PORT, () => {
  figlet(
    process.env.NAME_APP,
    {
      font: "Big Money-ne",
      horizontalLayout: "full",
      verticalLayout: "default",
      width: 180,
      whitespaceBreak: false,
    },
    function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        x;
        console.dir(err);
        return;
      }
      console.log(data);
      console.log(`Server is running on port ${PORT}.`);
    }
  );
});

module.exports = app;
