const User = require('../models/User')
const jwt = require('jsonwebtoken')
const secretStr = 'some random bullshit333'

module.exports = (req, res, next) => {
    let authHeaders = req.headers.authorization
    if(!authHeaders){
        return res.status(401).send('Invalid auth headers')
    }

    let token = authHeaders.split(' ')[1]
    if(!token){
        return res.status(401).send('Invalid token')
    }

    jwt.verify(token, secretStr, (err, decoded) => {
        if(err) return res.status(401).send('Error while handling the token')

        let userId = decoded.sub, 
            password = decoded.password
        if(!userId || !password) return res.status(401).send('Invalid token')

        User.findById(userId).then(foundUser => {
            if(!foundUser || foundUser.password !== password){
                if(!foundUser)
                    return res.status(401).send('In user problem')
                res.status(404).json({
                    reqPass:password,
                    foundPass:foundUser.password
                })
            }

            req.user = foundUser

            next()
        })
    })

}