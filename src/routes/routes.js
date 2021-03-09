module.exports = (app) => {
  // database Controller
  const databaseController = require("../controllers/database/database.controller.js");
  // Welcome API
  app.get("/", (req, res) => {
    res.send("hello world");
  });

  // Route Database
  app.get("/dbtest", databaseController.testDbConnection);
};
