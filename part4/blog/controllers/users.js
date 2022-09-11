const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const blogs = await User.find({})
  response.json(blogs)
})


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  //console.log(request.body)

  if( !request.body.password || password.length < 3 ){
    return response.status(400).json({ error: 'password too short or not set' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter