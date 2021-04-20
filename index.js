const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const figlet = require("figlet")
require("dotenv").config()
const process = require("process")

const app = express()

var corsOptions = {
  origin: "http://localhost:8080",
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const firebase = require("firebase")
const admin = require("firebase-admin")

const GOOGLE_APPLICATION_CREDENTIALS = require("./serviceAccountKey.json")

admin.initializeApp({
  credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS),
  databaseURL: process.env.DATA_BASE_URL_FIREBASE,
})

// TODO: Replace the following with your app"s Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics()

require("./src/routes/routes.js")(app)

const PORT = process.env.PORT || 80
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
        console.log("Something went wrong...")
        console.dir(err)
        return
      }
      console.log(`Server is running on port ${PORT}.`)
    }
  )
})

module.exports = app
