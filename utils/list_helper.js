const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((fav, blog) => blog.likes > fav.likes ? blog : fav, blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCount = blogs.reduce((count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1
    return count
  }, {})

  const topAuthor = Object.keys(authorCount).reduce((top, author) => {
    return authorCount[author] > authorCount[top] ? author : top
  })

  return {
    author: topAuthor,
    blogs: authorCount[topAuthor]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const authorLikes = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
    return likes
  }, {})

  const topAuthor = Object.keys(authorLikes).reduce((top, author) => {
    return authorLikes[author] > authorLikes[top] ? author : top
  })

  return {
    author: topAuthor,
    likes: authorLikes[topAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
