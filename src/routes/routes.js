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
  app.post("/api/user/register", userController.register);
  app.get("/api/user/signIn", userController.signIn);
  app.get("/api/user/info/:id", userController.getInfo);
  app.put("/api/user/:id", userController.updateUser);
  app.delete("/api/user/:id", userController.deleteUser);
};
