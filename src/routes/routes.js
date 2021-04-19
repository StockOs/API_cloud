module.exports = (app) => {
  const { verifyToken } = require("../middleware/firebase/firebaseMiddleware.js")

  const stripe = require("stripe")("sk_test_51IhsigDSZiNelETqeNJBlo62FfbUsZBk3CfkZ0ROhugBYjX6rVybIM1LXCvE35G6mf7HVh7Ai0V4zxEYb0QbD1LN00lsebOGYP")

  // Controller
  const databaseController = require("../controllers/database/database.controller.js")
  const userController = require("../controllers/users/users.controller.js")
  const categorieController = require("../controllers/categories/categories.controller.js")
  const authentificationController = require("../controllers/authentification/authentification.js")
  const itemController = require("../controllers/items/items.controller.js")
  const paymentController = require("../controllers/payment/payment.controller.js")

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
  app.put("/api/user", userController.updateUser)
  app.delete("/api/user/:id", userController.deleteUser)

  // Routes payment
  app.post("/api/payment", paymentController.payment)
  app.post("/api/payment", (req, res) => {
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: "Gauthier",
        address: {
          line1: "23 rue hello",
          city: "New Delhi",
          state: "Delhi",
          country: "india",
        },
      })
      .then((customer) => {
        return stripe.paymentIntents.create({
          amount: 7000,
          description: "Web developement product",
          currency: "eur",
          customer: customer.id,
        })
      })
      .then((charge) => {
        console.log(charge)
        res.send("Success")
      })
      .catch((err) => {
        res.send(err)
      })
  })

  // Routes categories
  app.get("/api/categories", categorieController.getAllCategories)
  app.get("/api/categories/:id", categorieController.getCategory)

  // Routes items
  app.post("/api/items", itemController.createItem)
  app.get("/api/items", itemController.getAllItems)
  app.get("/api/items/:keyItem", itemController.getItem)
  app.delete("/api/items/:keyItem", itemController.deleteItem)
  app.put("/api/items/:keyItem", itemController.updateItem)
}
