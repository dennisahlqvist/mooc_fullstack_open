const config = require('../utils/config')
const mongoose = require('mongoose')

const url = config.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

module.exports = mongoose.model('Blog', blogSchema)