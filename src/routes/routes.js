module.exports = (app) => {
  const { verifyToken } = require("../middleware/firebase/firebaseMiddleware.js")

  // Controller
  const databaseController = require("../controllers/database/database.controller.js")
  const userController = require("../controllers/users/users.controller.js")
  const categorieController = require("../controllers/categories/categories.controller.js")
  const authentificationController = require("../controllers/authentification/authentification.js")
  const itemController = require("../controllers/items/items.controller.js")

  // Welcome API
  app.get("/", (req, res) => {
    res.send("Welcome in the jungle of project-cloud api")
  })

  // Route Database
  app.get("/dbtest", databaseController.testDbConnection)

  // API VERIFY REQUETE
  /* checks if the API is well secured by a bearer Token */
  app.use("/api/", verifyToken)

  // Routes auth
  app.post("/auth/user/validate", authentificationController.validateUser)
  app.post("/auth/user/register", authentificationController.register)
  app.post("/auth/user/login", authentificationController.login)

  // Routes user
  app.get("/api/user/info", userController.getInfo)
  app.put("/api/user/:id", userController.updateUser)
  app.delete("/api/user/:id", userController.deleteUser)

  // Routes categories
  app.get("/api/categories", categorieController.getAllCategories)
  app.get("/api/categories/:id", categorieController.getCategory)

  // Routes items
  app.post("/api/items", itemController.createItem)
  app.get("/api/items", itemController.getAllItems)
  app.get("/api/items/:item", itemController.getItem)
}
