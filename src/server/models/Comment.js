const mongoose = require('mongoose')
const {Schema} = mongoose
const msg = '{PATH} is required'

let commentSchema = new Schema({
    body:{type:String,required:msg},
    author:{type:Schema.Types.ObjectId,ref:'User'},
    dateCreated:{type:Schema.Types.Date,default:Date.now()},
    likes:{type:Number,default:0},
    likedBy:[{type:Schema.Types.ObjectId,ref:'User'}]
})

let Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment 