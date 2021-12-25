const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/users')
const api = supertest(app)

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const user = {
  username: 'tests',
  name: 'tests',
  password: 'testing',
}

const loginObj = {
  username: 'tests',
  password: 'testing',
}

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(blogs[0])
  await blogObject.save()

  blogObject = new Blog(blogs[1])
  await blogObject.save()

  await User.deleteMany({})
  await api.post('/api/users').send(user)
}, 100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(blogs.length)
}, 100000)

test('Unique identifier property of the blog is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
  expect(response.body[1].id).toBeDefined()
}, 100000)

test('A valid blog can be added', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }

  const loggedInUser = await api.post('/api/login').send(loginObj)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${loggedInUser.body.token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const title = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(blogs.length + 1)
  expect(title).toContain('First class tests')
}, 100000)

test('If likes property is missing, it will default to 0', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  }

  const loggedInUser = await api.post('/api/login').send(loginObj)

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${loggedInUser.body.token}`)

  const response = await api.get('/api/blogs')
  expect(response.body[2].likes).toBe(0)
}, 100000)

test('If title or url properties are missing, backend responds with status code 400', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
    likes: 7,
  }

  const loggedInUser = await api.post('/api/login').send(loginObj)
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `bearer ${loggedInUser.body.token}`)
    .expect(400)
}, 100000)

test('Blog not added if token is not present', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  }

  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.status).toBe(401)

  const dbBlogs = await api.get('/api/blogs')
  expect(dbBlogs.body).toHaveLength(blogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
