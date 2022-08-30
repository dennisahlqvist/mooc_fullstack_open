

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
  errorHandler,
}