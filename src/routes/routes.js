module.exports = (app) => {
  // database Controller
  const databaseController = require("../controllers/database/database.controller.js");
  const userController = require("../controllers/users/users.controller.js");

  // Welcome API
  app.get("/", (req, res) => {
    res.send("Welcome in the jungle of project-cloud api");
  });

  // Route Database
  app.get("/dbtest", databaseController.testDbConnection);

  // Routes User
  app.get("/api/users", userController.getUser);
};
