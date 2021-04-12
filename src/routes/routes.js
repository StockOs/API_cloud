module.exports = (app) => {
  const {
    verifyToken,
  } = require('../middleware/firebase/firebaseMiddleware.js')

  // Controller
  const databaseController = require('../controllers/database/database.controller.js')
  const userController = require('../controllers/users/users.controller.js')
  const categoryController = require('../controllers/categories/categories.controller.js')
  const authentificationController = require('../controllers/authentification/authentification.js')
  const itemController = require('../controllers/items/items.controller')

  // Welcome API
  app.get('/', (req, res) => {
    res.send('Welcome in the jungle of project-cloud api')
  })

  // Route Database
  app.get('/dbtest', databaseController.testDbConnection)
  app.post('/auth/user/login', authentificationController.login)

  // API VERIFY REQUETE
  /* checks if the API is well secured by a bearer Token */
  app.use('/api/', verifyToken)

  // Routes auth
  app.post('/auth/user/validate', authentificationController.validateUser)
  app.post('/auth/user/register', authentificationController.register)


  // Routes user
  app.get('/api/user/info', userController.getInfo)
  app.put('/api/user/:id', userController.updateUser)
  app.delete('/api/user/:id', userController.deleteUser)

  // Routes categories
  app.get('/api/categories', categoryController.getAllCategories)
  app.get('/api/categories/:id', categoryController.getCategory)

  // Routes items
  app.get('/api/items', itemController.getAllItems)
  app.get('/api/items/:id', itemController.getItemById)
  app.post('/api/item', itemController.addItem)
  app.put('/api/items/:id', itemController.updateItem)
  app.delete('/api/items/:id', itemController.deleteItem)
}
