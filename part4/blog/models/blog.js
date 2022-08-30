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
    title: { type: String, required: true },
    author: String,
    url:  { type: String, required: true },
    likes: { type: Number, default: 0 }
  })

module.exports = mongoose.model('Blog', blogSchema)