const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')

require('../models/User')
require('../models/Post')
require('../models/Comment')

module.exports = (app) => {
  
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(session({
    secret: 'Hello?',
    resave: false,
    saveUninitialized: false
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use((req, res, next) => {
    if (req.user) {
      res.locals.currentUser = req.user
    }
    next()
  })

}
