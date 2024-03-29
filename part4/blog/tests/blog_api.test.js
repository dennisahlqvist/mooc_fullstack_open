
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

let token = ''

beforeAll(async () => {
  await User.deleteMany({})
  const newUser = {
    username: 'auser',
    name: 'the user',
    password: 'password',
  }

  const response = await api.post('/api/users').send(newUser)

  const userForToken = {
    username: response.body.username,
    id: response.body.id,
  }
  token = jwt.sign(userForToken, process.env.SECRET)

})


beforeEach(async () => {
  await Blog.deleteMany({})

  const initialBlogsCopy = initialBlogs
    .map(ablog => new Blog(ablog))
  const promiseArray = initialBlogsCopy.map(ablog => ablog.save())
  await Promise.all(promiseArray)
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
})

test('verify that the unique identifier is named id', async () => {
  let blog = await Blog.findOne({})
  expect(blog._id).toBeDefined()
})


describe('POST /api/blogs', () => {

  test('create a new blog post', async () => {
    const aBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(aBlog)
    expect(response.body).toBeDefined()

    const response2 = await api.get('/api/blogs')
    expect(response2.body).toHaveLength(initialBlogs.length+1)
  })

  test('if the likes is missing, default to 0', async () => {
    const aBlog =  {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(aBlog)
    expect(response.body).toBeDefined()

    const response2 = await api.get('/api/blogs')
    let lastBlog = response2.body[response2.body.length-1]
    expect(lastBlog.likes).toBe(0)
  })

  test('title and url properties are required', async () => {
  //jest.setTimeout(10000)
    const aBlog =  {
      author: 'Edsger W. Dijkstra',
      likes: 10
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(aBlog)
    expect(response).toBeDefined()
    expect(response.status).toBe(400)
  })

  test('token are required', async () => {
  //jest.setTimeout(10000)
    const aBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    }
    const response = await api
      .post('/api/blogs')
      //.set('Authorization', `bearer ${token}`)
      .send(aBlog)
    expect(response).toBeDefined()
    expect(response.status).toBe(401)
  })

})

describe('DELETE /api/blogs', () => {

  test('delete blog', async () => {
  //jest.setTimeout(10000)
    let startBlogs = await Blog.find({})
    let blogToDelete = startBlogs[0]
    const response = await api.delete(`/api/blogs/${blogToDelete.id}`)

    expect(response).toBeDefined()
    expect(response.status).toBe(204)
    let endBlogs = await Blog.find({})
    expect(endBlogs.length).toBe(startBlogs.length -1)
  })



  test('delete non existing', async () => {
  //jest.setTimeout(10000)
    let startBlogs = await Blog.find({})
    let blogToDelete = { id: 21343452435 }
    const response = await api.delete(`/api/blogs/${blogToDelete.id}`)

    expect(response).toBeDefined()
    expect(response.status).toBe(400)
    expect(response.status).not.toBe(204)
    let endBlogs = await Blog.find({})
    expect(endBlogs.length).toBe(startBlogs.length)
  })

})

describe('PUT /api/blogs', () => {

  test('update blog likes', async () => {
    let startBlogs = await Blog.find({})
    const aBlog = startBlogs[0]
    aBlog.likes += 3
    const response = await api.put(`/api/blogs/${aBlog.id}`).send(aBlog)
    expect(response).toBeDefined()
    expect(response.status).toBe(200)
    let endBlogs = await Blog.find({})
    expect(endBlogs.length).toBe(startBlogs.length)
    expect(endBlogs[0].likes).toBe(aBlog.likes)
  })

  test('update blog title', async () => {
    let startBlogs = await Blog.find({})
    const aBlog = startBlogs[0]
    aBlog.title = 'a Blog'
    const response = await api.put(`/api/blogs/${aBlog.id}`).send(aBlog)
    expect(response).toBeDefined()
    expect(response.status).toBe(200)
    let endBlogs = await Blog.find({})
    expect(endBlogs.length).toBe(startBlogs.length)
    expect(endBlogs[0].likes).toBe(aBlog.likes)
    expect(endBlogs[0].title).toBe(aBlog.title)
  })

})

