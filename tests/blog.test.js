const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const listWithMultipleBlogs = [
    {
      _id: '1',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'url1',
      likes: 4
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'url2',
      likes: 5
    },
    {
      _id: '3',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'url3',
      likes: 10
    }
  ]

  test('when list has multiple blogs, equals the sum of likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 19)
  })
})

describe('favorite blog', () => {
  const listWithMultipleBlogs = [
    {
      _id: '1',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'url1',
      likes: 4
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'url2',
      likes: 5
    },
    {
      _id: '3',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'url3',
      likes: 10
    }
  ]

  test('returns the blog with most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      _id: '3',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'url3',
      likes: 10
    })
  })
})

describe('favorite blog', () => {
  const listWithMultipleBlogs = [
    {
      _id: '1',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'url1',
      likes: 4
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'url2',
      likes: 5
    },
    {
      _id: '3',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'url3',
      likes: 10
    },
    {
      _id: '4',
      title: 'Blog 4',
      author: 'Author 3',
      url: 'url4',
      likes: 19
    },
    {
      _id: '5',
      title: 'Blog 5',
      author: 'Author 3',
      url: 'url5',
      likes: 4
    }
  ]
  test('returns the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      author: 'Author 3',
      blogs: 3
    })
  })
})

describe('favorite blog', () => {
  const listWithMultipleBlogs = [
    {
      _id: '1',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'url1',
      likes: 4
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'url2',
      likes: 5
    },
    {
      _id: '3',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'url3',
      likes: 10
    },
    {
      _id: '4',
      title: 'Blog 4',
      author: 'Author 3',
      url: 'url4',
      likes: 19
    },
    {
      _id: '5',
      title: 'Blog 5',
      author: 'Author 3',
      url: 'url5',
      likes: 4
    }
  ]
  test('returns the author with most likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      author: 'Author 3',
      likes: 33
    })
  })
})