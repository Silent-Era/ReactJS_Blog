const User = require('../models/User')
const enc = require('../utils/encryption')

module.exports = {
    loginUser: (req, res) => {
        let { username, password } = req.body

        if(!username || !password){
            //error will be added
            return
        }

        User.findOne({username}).then(foundUser => {
            if(!foundUser){
                res.status(200).send({error:'Invalid credentials'})
                return
            }

            let hashedPassword = enc.generateHashPass(foundUser.salt,password)
            if(hashedPassword !== foundUser.password){
                res.status(200).send({error:'Invalid credentials'})
                return
            }

            req.logIn(foundUser, (err , user) => {
                if (err) {
                    return res.status(200).send({ message: 'Wrong credentials!' });
                }

                res.status(200).send(foundUser)
            })
        })
    }    
}