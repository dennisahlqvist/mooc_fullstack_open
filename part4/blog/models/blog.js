const config = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose')

const url = config.MONGODB_URI

logger.info('connecting to', url)

mongoose.connect(url)
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

module.exports = mongoose.model('Blog', blogSchema)