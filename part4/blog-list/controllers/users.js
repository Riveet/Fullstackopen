const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/users')

userRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.username || !body.name || !body.password) {
    return response
      .status(400)
      .json({ error: 'Please enter username, name and password' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    password: passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  })

  response.status(200).json(users)
})

userRouter.delete('/', async (req, res) => {
  await User.deleteMany({})
  res.status(204).end()
})

module.exports = userRouter
