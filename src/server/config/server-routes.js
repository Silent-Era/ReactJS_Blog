const express = require('express')
const path = require('path')

module.exports= (app) => {
    app.use(express.static(path.resolve(__dirname,'../../../','build')))

    //all the server api's will be handled here
    app.get('/api/hello',(req,res) => {
        res.status(200).send('Heeeeey')
    })

    //rest for react router
    app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname, '../../../', 'build', 'index.html'));
    })

}