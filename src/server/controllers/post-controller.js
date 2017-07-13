const Post = require('../models/Post')

let validateCreatePostForm = (formBody) => {
    let errors = []
    let { title, text } = formBody

    if(!title) errors.push({message: 'Posts must have a title'})
    if(!text) errors.push({message: 'Posts must have a body'})

    return errors
}

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
                res.json(response)
            }).catch(err => {
                console.log(err)
                res.status(501).send('Mistake on our end :(')
            })
    },
    createPost: (req, res) => {
        let formBody = req.body
        let errors = validateCreatePostForm(formBody)
        if(errors.length > 0){
            return res.json({
                errors,
                data:null
            })
        }
        
        let reqPost = {
            author:req.user._id,
            title: formBody.title,
            text: formBody.text,
            background: formBody.background
        }

        Post.create(reqPost).then(createdPost => {
            User.findById(req.user._id).then(foundUser => {
                if(!foundUser){
                    console.log('Wrong post author')
                   return res.status(503).send('Wrong post author')
                }

                foundUser.posts.push(createdPost._id)
                foundUser.save()

                res.json({
                errors:[],
                data:{
                    postCreated:true,
                    postData:createdPost
                }
            })

        })
            
        }).catch(err => {
            console.log(err)
            res.status(501).send('Error on our end')
        })
    },
    getSinglePost: (req, res) => {
        let postId = req.params.id
        if(!postId){
            return res.status(404).send('Invalid link')
        }

        Post.findById(postId).then(foundPost => {
            if(!foundPost){
                return res.status(404).send('Invalid link')
            }

            res.json({
                errors:[],
                data:{
                    post:foundPost
                }
            })
        })
    }
}