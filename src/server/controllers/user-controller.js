const User = require('../models/User')
const enc = require('../utils/encryption')
const passport = require('passport')

let validateLoginForm = (formBody) => {
    let errors = []
    
    //TODO validate input fields
    return errors 
}

let validateRegisterForm = (formBody) => {
    let errors = []
    
    //TODO validate input fields
    return errors 
}

let passportAuth = (req, res) => {
    passport.authenticate('local-login',(err, token, userData) => {
        if(err){
            res.status(200).json({errors:[{message:err.message}], data:null}) 
        }

        res.json({
            errors:[],
            data:userData,
            token
        })
    })(req, res)
}

module.exports = {
    loginUser: (req, res) => {
       let errors = validateLoginForm(req.body)
       if(errors.length > 0){
          return res.status(200).json({errors,data:null})
       }

       passportAuth(req, res)
    },
    registerUser: (req, res) => {
        let errors = validateRegisterForm(req.body)
        if(errors.length > 0){
           return res.status(200).json({errors, data:null})
        }

        let salt = enc.generateSalt()
        let reqUser = {
            username: req.body.username,
            salt: salt,
            password: enc.generateHashPass(salt, req.body.password),
            email: req.body.email
        }

        User.create(reqUser).then(createdUser => {
            passportAuth(req, res)
        }).catch(err => {
            if(err.code = 11000){
               return res.status(200)
                        .json({errors:[{message:'User already exists'}], data:null})
            }
            res.status(200).json({errors:[{message:err.message}], data:null})
        })
    },
    test: (req, res) => {
        res.json({user:req.user, message:'test went well'})
    }    
}