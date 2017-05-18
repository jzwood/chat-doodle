var express = require('express')
var router = express.Router()

var sessionsKeyLength = 6

router.get('/:id([a-z0-9]{' + sessionsKeyLength + '})', function(req, res, next) {
  return res.render('main', { title: 'Private Doodle', room: req.params.id })
})

router.get('/', function(req, res, next) {
  return res.redirect('/' + Math.random().toString(36).slice(2, 2 + sessionsKeyLength))
})

module.exports = router
