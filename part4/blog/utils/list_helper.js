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




module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}