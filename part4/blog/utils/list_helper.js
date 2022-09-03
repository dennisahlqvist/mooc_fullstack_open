var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0){return null}
  const favorite = blogs.reduce((favorite, blog) => {
    if(blog.likes > favorite.likes ){
      return blog
    }else{
      return favorite
    }
  }, blogs[0])
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0){
    return {}
  }
  let allAuthors = blogs.map((blog) => blog.author )

  var biggestAuthor = _.head(_(allAuthors)
    .countBy()
    .entries()
    .maxBy(_.last))

  let biggestCount = allAuthors.filter(x => x===biggestAuthor).length
  return { author: biggestAuthor,blogs: biggestCount }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0){
    return {}
  }
  let authorsLikes = {}
  blogs.map((blog) => {
    if(blog.author in authorsLikes){
      authorsLikes[blog.author] += blog.likes
    }else{
      authorsLikes[blog.author] = blog.likes
    }
  })
  let mostLikedAuthor = (Object.keys(authorsLikes).reduce((a, b) => authorsLikes[a] > authorsLikes[b] ? a : b))

  return { author: mostLikedAuthor,likes: authorsLikes[mostLikedAuthor] }
}




module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}