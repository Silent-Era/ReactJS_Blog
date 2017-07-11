const mongoose = require('mongoose')
const {Schema} = mongoose
const msg = '{PATH} is required'

let postSchema = new Schema({
    title:{type:String,required:msg},
    body:{type:String},
    author:{type:Schema.Types.ObjectId,ref:'User'},
    comments:[{type:Schema.Types.ObjectId,ref:'Comment'}],
    likes:{type:Number,default:0},
    views:{type:Number,default:0},
    background:{type:String},
    likedBy:[{type:Schema.Types.ObjectId,ref:'User'}]
},{ timestamps: true })

let Post = mongoose.model('Post',postSchema)

module.exports = Post