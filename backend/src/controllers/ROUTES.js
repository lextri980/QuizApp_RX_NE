const questionsRouter = require('./questions')

function route(app) {
  app.use('/questions', questionsRouter)
}

module.exports = route