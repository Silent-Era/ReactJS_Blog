import React, { Component } from 'react'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import FlatButton from 'material-ui/Button'
import $ from 'jquery'

class HomePage extends Component {
    constructor (props) {
        super(props)
        
        this.state = { 
            posts: null
        }
    }
    
    componentWillMount () {
        $.get('http://localhost:3001/posts/getall').then(respond => {
            if(!respond.errors.length){
                this.setState({
                    posts:respond.data.posts
                })
            } 
        })
    }
    
    render () { 
        let posts = this.state.posts
        if(posts){
            posts = this.parsePosts(posts)
        }
        return (
            <div>
                {posts || 'No posts yet'}
            </div>
        )
    }

    parsePosts(posts){
        let generateCard = (post) => {
            let author = post.author
            let cardMedia = null
            let avatarUrl = author.profilePic

            if(avatarUrl[0]==='.') 
                avatarUrl = process.env.PUBLIC_URL + avatarUrl.substring(1)

            if(post.background){
                cardMedia=(
                    <CardMedia
                    overlay={ post.title }>
                        <img src={ post.background } alt=""/>
                    </CardMedia>
                )
            }
            return (
                <Card key={post._id}>
                    {'Content  '}
                </Card>
            )
        }

       return posts = posts.map(post => generateCard(post))
    }
}

export default HomePage;
