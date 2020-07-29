const express = require('express')
const morgan = require('morgan')
const path = require('path')

const router = require('./routes/router')
const bodyParser = require('body-parser')

const app = express()

// Settings
app.set('port', process.env.PORT || 4000)
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

// Middleware
app.use([
  morgan('dev'),
  express.urlencoded({extended: false})
])
// Routes
app.use('/', router)

// Start server
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`)
})