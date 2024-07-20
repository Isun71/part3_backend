const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Sample Blog',
    author: 'Anonoymous Author',
    url: 'random.url',
    likes: 5
  },
  {
    title: 'diary of Tom',
    author: 'Tom Handrik',
    url: 'diary.tom',
    likes: 8
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs: initialBlogs, nonExistingId, blogsInDb: blogsInDb
}