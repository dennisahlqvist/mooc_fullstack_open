const jwt = require('jsonwebtoken')

const userExtractor = (request, response, next) => {
  if(request.token){
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id ) {
      request.user = decodedToken
    } else {
      request.user = null
    }
  }else{
    request.user = null
  }
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'ValidatorError') {
    return response.status(400).json({ error: error.message })
  } else {
    return response.status(400).json({ error: error.message })
  }

  // eslint-disable-next-line no-unreachable
  next(error)
}

module.exports = {
  userExtractor,
  tokenExtractor,
  errorHandler
}