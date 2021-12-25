const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/users')

const api = supertest(app)

const users = [
  {
    username: 'larryDavid',
    name: 'Larry David',
    password: 'foisted',
  },
  {
    username: 'gregtheegg',
    name: 'Greg Roy',
    password: 'gregtheegg',
  },
]

describe('Tests for the user routes', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    let userObject = new User(users[0])
    await userObject.save()

    userObject = new User(users[1])
    await userObject.save()
  }, 100000)

  // test('Successfull login', async () => {
  //   const response = await api.post('/api/login').send(loginObj).expect(200)

  //   expect(response.body).toHaveProperty('token')
  // })

  test('To check that invalid users are not created', async () => {
    const newUser = {
      username: '45',
      password: 'gloryglorymanutd',
    }

    await api.post('/api/users').send(newUser)

    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(2)
  }, 100000)

  test('To check that server responds with a 400 and error message if user is invalid', async () => {
    const newUser = {
      username: '45',
      password: 'gloryglorymanutd',
    }

    const response = await api.post('/api/users').send(newUser)

    expect(response.status).toBe(400)
    expect(response.text).toBe(
      '{"error":"Please enter username, name and password"}'
    )
  }, 100000)

  afterAll(() => {
    mongoose.connection.close()
  })
})
