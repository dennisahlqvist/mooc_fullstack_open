const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')


const usersInDb = async () => {
  return User.find({})
}

describe('POST /api/users',() => {
  beforeEach(async () => {
    await User.deleteMany({})
    //...
  })

  test('users db empty', async() => {
    const allUsers = await usersInDb()
    expect(allUsers).toHaveLength(0)
  })

  test('empty password', async() => {
    const newUser = {
      username: 'auser',
      name: 'the user',
      //password: 'password',
    }

    const response = await api.post('/api/users').send(newUser)
    expect(response).toBeDefined()
    expect(response.status).not.toBe(201)
    expect(response.status).toBe(400)

    const allUsers = await usersInDb()
    expect(allUsers).toHaveLength(0)
  })

  test('short password', async() => {
    const newUser = {
      username: 'auser',
      name: 'the user',
      password: 'pa',
    }

    const response = await api.post('/api/users').send(newUser)
    expect(response).toBeDefined()
    expect(response.status).not.toBe(201)
    expect(response.status).toBe(400)

    const allUsers = await usersInDb()
    expect(allUsers).toHaveLength(0)
  })

  test('empty username', async() => {
    const newUser = {
      //username: 'auser',
      name: 'the user',
      password: 'password',
    }

    const response = await api.post('/api/users').send(newUser)
    expect(response).toBeDefined()
    expect(response.status).not.toBe(201)
    expect(response.status).toBe(400)

    const allUsers2 = await usersInDb()
    expect(allUsers2).toHaveLength(0)
  })

  test('short username', async() => {
    const newUser = {
      username: 'au',
      name: 'the user',
      password: 'password',
    }

    const response = await api.post('/api/users').send(newUser)
    expect(response).toBeDefined()
    expect(response.status).not.toBe(201)
    expect(response.status).toBe(400)

    const allUsers = await usersInDb()
    expect(allUsers).toHaveLength(0)
  })

  test('should pass case', async() => {
    const newUser = {
      username: 'auser',
      name: 'the user',
      password: 'password',
    }

    const response = await api.post('/api/users').send(newUser)
    expect(response).toBeDefined()
    expect(response.status).toBe(201)

    const allUsers = await usersInDb()
    expect(allUsers).toHaveLength(1)})



  test('duplicate username', async() => {
    const newUser = {
      username: 'auser',
      name: 'the user',
      password: 'password',
    }

    const response = await api.post('/api/users').send(newUser)
    expect(response).toBeDefined()
    expect(response.status).toBe(201)

    const allUsers = await usersInDb()
    expect(allUsers).toHaveLength(1)

    const response2 = await api.post('/api/users').send(newUser)
    expect(response2).toBeDefined()
    expect(response2.status).not.toBe(201)
    expect(response2.status).toBe(400)

    const allUsers2 = await usersInDb()
    expect(allUsers2).toHaveLength(1)
  })
})