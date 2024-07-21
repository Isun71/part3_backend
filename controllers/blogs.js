// controllers/blogs.js
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'internal server error' })
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  try {
    const user = request.user

    if (!user) {
      return response.status(401).json({ error: 'user missing or invalid' })
    }

    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'internal server error' })
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  try {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (!user || blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'unauthorized user' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'internal server error' })
  }
})

module.exports = blogsRouter
