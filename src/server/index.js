const app = require('express')()
const port = 3001

require('./config/server-routes')(app)

app.listen(port,()=> {
    console.log('Express listening on',port)
})