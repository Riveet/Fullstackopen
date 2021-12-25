const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/users')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  console.log('user', user)
  console.log('user password', user.password)
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(body.password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'Invalid username or password',
      user,
      body,
      passwordCorrect,
    })
  }

  const userForToken = {
    username: user.username,
    userId: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  response.status(200).send({
    token,
    username: user.username,
    name: user.name,
    userId: user._id,
  })
})

module.exports = loginRouter
