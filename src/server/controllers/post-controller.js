const Post = require('../models/Post')

module.exports = {
    getAllPosts: (req, res) => {
        Post.find()
            .limit(100)
            .sort('-createdAt')
            .populate('author', '_id isBlocked username profilePic')
            .populate({ path: 'comments', populate:{ path:'author',select:'_id isBlocked username'}})
            .then(posts => {
                let response = {
                    errors:[],
                    data:{
                        posts
                    }
                }
                res.json(responese)
            }).catch(err => {
                console.log(err)
                res.status(501).send('Mistake on our end :(')
            })
    }
}