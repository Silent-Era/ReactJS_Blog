const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')

module.exports = (app) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(passport.initialize())
}
