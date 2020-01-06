const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = mongoose.model("User")
// get access to User modal

const router = express.Router()

router.post("/signup", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = new User({ email, password }) // we use the email and password from the req body to create a new user instance
    // email and password comes out of the req.body above
    await user.save()

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY")
    // res.send("You made a post request")
    res.send({ token: token })
  } catch (err) {
    return res.status(422).send(err.message)
  }
})

router.post("/signin", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" })
  }

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).send({ error: "Email not found" })
  }

  try {
    await user.comparePassword(password)
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY")
    res.send({ token })
  } catch (err) {
    return res.status(422).send({ error: "password not valid" })
  }
})
module.exports = router
