const mongoose = require('mongoose')
const {Schema} = mongoose
const enc = require('../utils/encryption')
const msg = '{PATH} is required'
const profilePicDefault = './images/default-avatar.png'

let userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: msg},
  password: {type: String, required: true},
  profilePic:{type:String, default:profilePicDefault},
  roles: [{type: String}],
  salt: {type: String},
  isBlocked: {type:Boolean, default:false},
  posts: [{type:Schema.Types.ObjectId, ref:'Post'}],
  dateCreated: {type:Schema.Types.Date, default:Date.now()},
  comments: [{type:Schema.Types.ObjectId, ref:'Comment'}],
  email: {type:String, default: ''}
})

let User = mongoose.model('User', userSchema)


User.seedAdmin = () =>{
    let salt = enc.generateSalt()
    adminUser = {
      username:'admin',
      salt:salt,
      password:enc.generateHashPass(salt,'admin'),
      roles:['Admin']
    } 

    User.findOne({username:'admin'}).then(foundUser => {
        if(!foundUser) createAdmin()
    })

    function createAdmin(){
      User.create(adminUser).then(user => {
        console.log('admin user seeded in database')
      }).catch(err => {
        console.log('Seeding user error',err)
      })
    }
} 

module.exports = User
