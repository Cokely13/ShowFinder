// const path = require('path')
// const express = require('express')
// const morgan = require('morgan')
// const app = express()
// module.exports = app

// // logging middleware
// app.use(morgan('dev'))

// // body parsing middleware
// app.use(express.json())

// // auth and api routes
// app.use('/auth', require('./auth'))
// app.use('/api', require('./api'))

// app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// // static file-serving middleware
// app.use(express.static(path.join(__dirname, '..', 'public')))

// // any remaining requests with an extension (.js, .css, etc.) send 404
// app.use((req, res, next) => {
//   if (path.extname(req.path).length) {
//     const err = new Error('Not found')
//     err.status = 404
//     next(err)
//   } else {
//     next()
//   }
// })

// // sends index.html
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'public/index.html'));
// })

// // error handling endware
// app.use((err, req, res, next) => {
//   console.error(err)
//   console.error(err.stack)
//   res.status(err.status || 500).send(err.message || 'Internal server error.')
// })

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const multer = require('multer')

const app = express()

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

// file upload middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })
app.use(upload.single('image'))

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

// send index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public/index.html')))

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// send index.html for any remaining requests
app.use('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'public/index.html')))

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

module.exports = app
