const listHelper = require('../utils/list_helper')
const blog_arrays = require('./blog_arrays')



test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {


  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blog_arrays.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(blog_arrays.listWithManyBlogs)
    expect(result).toBe(36)
  })

  test('when list is empty, equals the likes of 0', () => {
    const result = listHelper.totalLikes(blog_arrays.listWithZeroBlogs)
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {

  test('find most liked blog', () => {

    const result = listHelper.favoriteBlog(blog_arrays.listWithManyBlogs)
    expect(result).toEqual(blog_arrays.listWithManyBlogs[2])
  })

  test('find most liked blog in empty array', () => {

    const result = listHelper.favoriteBlog(blog_arrays.listWithZeroBlogs)
    expect(result).toEqual(null)
  })
  // not sure what should be returned

  test('find most liked blog of one', () => {

    const result = listHelper.favoriteBlog(blog_arrays.listWithOneBlog)
    expect(result).toEqual(blog_arrays.listWithOneBlog[0])
  })

})

describe('favorite author', () => {

  test('find most liked author', () => {

    const result = listHelper.mostBlogs(blog_arrays.listWithManyBlogs)
    expect(result).toEqual( { author: 'Robert C. Martin',blogs:3 } )
  })

  test('find most liked author in empty array', () => {

    const result = listHelper.mostBlogs(blog_arrays.listWithZeroBlogs)
    expect(result).toEqual({})
  })

  test('find most liked author of one', () => {

    const result = listHelper.mostBlogs(blog_arrays.listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra',blogs:1 })
  })

})

describe('most liked author', () => {

  test('find most liked author', () => {

    const result = listHelper.mostLikes(blog_arrays.listWithManyBlogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra',likes:17 })
  })

  test('find most liked author in empty array', () => {

    const result = listHelper.mostLikes(blog_arrays.listWithZeroBlogs)
    expect(result).toEqual({})
  })

  test('find most liked author of one', () => {

    const result = listHelper.mostLikes(blog_arrays.listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra',likes:5 })
  })

})