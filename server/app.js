const app = require('express')()
const routes = require('./routes')
const userRoute = require('./routes/user')
const messageRoute = require('./routes/message')

//  Connect all our routes to our application
app.use('/', routes)
app.use('/user/', userRoute)
app.use('/message/', messageRoute)

// Turn on that server!
app.listen(3000, () => {
  console.log('App listening on port 3000')
})