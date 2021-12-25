const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('userId', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const token = request.token
  const { userId } = request.user

  if (!token || !userId) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }

  const user = await User.findById(userId)

  const blog = new Blog(body)

  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { userId } = request.user
  const id = request.params.id

  const blog = await Blog.findOne({ _id: id })
  console.log(blog.userId)

  if (blog.userId.toString() !== userId.toString()) {
    return response
      .status(401)
      .json({ error: 'Unauthorized to access this route' })
  }

  await Blog.deleteOne(blog)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedObj = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedObj, {
    new: true,
    runValidators: true,
  })
  response.status(200).json(blog)
})

blogsRouter.delete('/', async (req, res) => {
  await Blog.deleteMany({})
  res.status(204).end()
})

module.exports = blogsRouter
