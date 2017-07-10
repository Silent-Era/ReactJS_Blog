const express = require('express')
const path = require('path')
const controllers = require('../controllers')
const authCheck = require('../middlewares/auth-check')

let setServerRoutes = (app) => {
    app.post('/user/login', controllers.userController.loginUser)
    app.post('/user/register',controllers.userController.registerUser)

    app.get('/test', authCheck, controllers.userController.test)
}

module.exports= (app) => {
    app.use(express.static(path.resolve(__dirname,'../../../','public'))) //for non-production

    //all the server api's will be handled here
    setServerRoutes(app)

    //rest for react router
     app.get('*',(req,res) => {  // for non production
        res.sendFile(path.resolve(__dirname, '../../../', 'public', 'index.html')); 
    })

}