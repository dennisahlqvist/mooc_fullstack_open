const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const aUser = await User.findById(request.user.id)

  const blog = new Blog(request.body)
  blog.user = aUser.id
  const savedBlog = await blog.save()

  aUser.blogs = aUser.blogs.concat(savedBlog._id)
  await aUser.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() !== request.user.id.toString() ){
    return response.status(401).json({ error: 'only the user that created a blog can delete it' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body._doc
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(newBlog).end()
})

module.exports = blogsRouter