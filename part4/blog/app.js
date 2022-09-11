//const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const logger = require('./utils/logger')
const { userExtractor, tokenExtractor, errorHandler } = require('./utils/middleware')


app.use(cors())
app.use(express.json())

const url = config.MONGODB_URI

logger.info('connecting to', url)

mongoose.connect(url)
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })



app.use('/api/blogs', tokenExtractor, userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

module.exports = app