const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const { MONGODB_URI } = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom,
  userExtractor,
} = require('./utils/middleware')

logger.info('connecting to MongoDB')

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((err) => {
    logger.error('Error connecting to MongoDB', err.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(getTokenFrom)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
