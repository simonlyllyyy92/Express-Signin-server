require("./modals/User")
//by putting require modal here, we make sure the mongosse.model('User', userSchema) only called
//once, so we don't have to call it every time when we require it in other file like authRoutes.
// if we call require every time we need it  it will be executed a second and third time, and it's not allowed to call multiple times

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
//help automatically parse the info associated with the body property of incoming request
const authRoutes = require("./routes/authRoutes")
const requireAuth = require("./middlewares/requireAuth")
let port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)

const mongoUri =
  "mongodb+srv://admin:lyy6756867@cluster0-cgwb6.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
//useNewUrlParser and the next one is simply try to avoid some warning in our terminal

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance")
})

mongoose.connection.on("error", err => {
  console.error("Error connecting to mongo", err)
})

app.get("/", (req, res) => {
  res.send(`Your email is ${req.user.email}`)
})

app.listen(port, () => {
  console.log("listening on port 3000")
})
