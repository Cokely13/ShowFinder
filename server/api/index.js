const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/shows', require('./shows'))
router.use('/ratings', require('./ratings'))
router.use('/recommendations', require('./recommendations'))
router.use('/friends', require('./friends'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
