require('dotenv').config()
const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const gradient = require('gradient-string')
const routes = require('./routes')

// Start the API server
const PORT = process.env.PORT || 3001
const app = express()

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  if (req.path !== '/' && !req.path.includes('.')) {
    res.header({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
      'Content-Type': 'application/json; charset=utf-8',
      'set-cookie': [
        'same-site-cookie=bar; SameSite=Lax',
        'cross-site-cookie=foo; SameSite=None; Secure'
      ]
    })
  }
  next()
})
app.use(morgan('dev'))

// DB Config
const db = require('./config/keys').mongoURI

mongoose.Promise = global.Promise
mongoose.set('useNewUrlParser', true)
// mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose
.connect(db)
.then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))
  
  // Serve up static assets (usually on heroku)
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  // console.log(db)
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  // })
}
// Passport Middleware
app.use(passport.initialize())
require('./config/passport')(passport) // require our local strategy

// Add routes, and API
app.use(routes)

const server = app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})

// =============================================================================
// Socket.IO Routes
// =============================================================================

const io = require('socket.io')(server)
// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log(gradient.vice('\nNew client connected'))
  
  socket.on('admin', data => {
    console.log('\nAdmin Message:', gradient.summer(data.message))
    // socket.emit('im here', data)
  })
  socket.on('adminID', data => {
    console.log('\nAdmin ID Message:', gradient.summer(data.message))
    // socket.emit('im here', data)
  })
  socket.on('adminGreet', data => {
    console.log('\nAdmin Greet Message:', gradient.summer(data.message))
    io.emit('helloParents', data)
  })
  socket.on('adminTime', data => {
    console.log('\nAdmin Time Message:', gradient.summer(data.message))
    // socket.emit('im here', data)
  })
  socket.on('arrived', data => {
    console.log('\nArrival Message:', gradient.summer(data.message))
    io.emit('hello', { message: 'We see you' })
    io.emit('/waiting', data) // sending data to Waiting Container
  })

  socket.on('/Admin/GeoArrived', data => {
    console.log('data received by', data)
    io.emit('/waiting', data) // sending data to Waiting Container
  })
  socket.on('testTime', data => {
    console.log('\nTest Time Data Received:', gradient.summer(data.message))
    // socket.emit('im here', data)
  })
  socket.on('testFamily', data => {
    console.log('\nTest Family Data Received:', gradient.summer(data.message))
    // socket.emit('im here', data)
  })

  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log(gradient.atlas('\nuser disconnected'))
  })
})
