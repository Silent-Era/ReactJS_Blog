const conStr = 'mongodb://localhost:27017/ReactJS_Blog'
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

require('../models/User').seedAdmin()
require('../models/Post')
require('../models/Comment')



module.exports = () => {
  mongoose.connect(conStr)

  let database = mongoose.connection

  database.once('open', () => {
    console.log('db connected')
  })

  database.on('error', err => {
    console.log(err)
  })
}
