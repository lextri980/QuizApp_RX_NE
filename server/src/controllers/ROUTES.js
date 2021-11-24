

function route(app) {
    app.use('/', (req,res) => {
      res.send('hello world')
    })
}

module.exports = route