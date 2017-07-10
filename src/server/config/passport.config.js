const passport = require('passport')
const User = require('../models/User')
const { Strategy } = require('passport-local')
const enc = require('../utils/encryption')
const jwt = require('jsonwebtoken')
const secretStr = 'some random bullshit333'
const error = {message:'Invalid credentials'}

let localLoginStrategy = new Strategy({
    session:false,
    passReqToCallback:true
}, (req, username, password, done) => {
    const user = {
        username:username.trim(),
        password:password.trim()
    }

    User.findOne({username:user.username}).then(foundUser => {
        if(!foundUser){
          let error = {message:'Invalid credentials!'}
          return done(error)
        }

        let hashedPass = enc.generateHashPass(foundUser.salt, password)

        if(foundUser.password !== hashedPass){
          let error = {message:'Invalid credentials!'}
           return done(error)
        }

        let payload = {
          sub: foundUser._id,
          password: foundUser.password
        }

        let token = jwt.sign(payload,secretStr)
        let userData = {
          username:username,
          roles:foundUser.roles,
          posts:foundUser.posts,
          comments:foundUser.comments,
          isBlocked:foundUser.isBlocked,
          profilePic:foundUser.profilePic,
          email: foundUser.email
        }

        done(null, token, userData)
    })
})

module.exports = () => {
   passport.use('local-login',localLoginStrategy)
}
