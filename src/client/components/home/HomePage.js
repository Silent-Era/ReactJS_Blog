import React, { Component } from 'react'
import history from '../../history'

import * as types from '../../actions/posts/postActionTypes'
import postActions from '../../actions/posts/postActions'
import postStore from '../../stores/posts/postStore'

import Card, { CardHeader, CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Avatar from 'material-ui/Avatar'
import LoadingCircle from '../shared/LoadingCircle'
import Collapse from 'material-ui/transitions/Collapse'

let cardStyle = {
    width:'70%',
    margin:'0 auto'
}

let cardMediaStyle = {
    width:'100%'
}

let cardContentStyle = {
    background:'#222222',
    color:'white',
    fontFamily:'sans-serif'
}

let buttonStyle = {
    background:'#3F51B5',
    color:'white'
}

let cardCollapseStyle={
    background:'#222222',
    color:'white',
    fontFamily:'sans-serif',
    padding:'2%',
    textAlign:'justify'
}

class HomePage extends Component {
    constructor (props) {
        super(props)
        
        this.state = { 
            posts: null,
            showLoading:false,
            expanded:0
        }
        this.handleExpandClick = this.handleExpandClick.bind(this)
        postStore.on(types.GET_RECENT_POSTS, this.setLoading.bind(this))
        postStore.on(types.GOT_RECENT_POSTS, this.setRecentPosts.bind(this))
    }
    
    componentWillMount () {
        postActions.getRecentPosts()
    }
    
    componentWillUnmount () {
        postStore.removeListener(types.GET_RECENT_POSTS, this.setLoading.bind(this))
        postStore.removeListener(types.GOT_RECENT_POSTS,this.setRecentPosts)
    }
    
    
    render () { 
        let posts = this.state.posts
        let loading = null
        if(this.state.showLoading){
            loading = <LoadingCircle />
        }
        if(posts){
            posts = this.parsePosts(posts)
        }
        return (
            <div>
                <div className='loading'>{loading}</div>
                {posts}
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
                    <CardMedia>
                        <img src={ post.background } style={cardMediaStyle} alt=""/>
                    </CardMedia>
                )
            }
            let postText = post.text
            if(postText.length > 200) postText = postText.substring(0,197) + '...'
            let expand = false;
            if(this.state.expanded=== post._id) expand = true
            return (
                <Card style={cardStyle} key={post._id}>
                    <CardHeader
                        avatar={
                            <Avatar src={ avatarUrl }/>
                        }
                        title={ author.username }
                     />
                     { cardMedia }
                     <CardContent style={cardContentStyle}>
                        <h2>{post.title}</h2>
                        <p>{postText}</p>
                     </CardContent>
                     <CardActions style={cardContentStyle}>
                         <Button 
                            style={buttonStyle} 
                            onClick={this.handleExpandClick.bind(this, post._id)}>
                             Read more
                         </Button>
                         <Button 
                            style={buttonStyle} 
                            data-route={`/posts/details/${post._id}`}
                            onClick={this.navigate}>
                             Read Comments
                         </Button>
                     </CardActions>
                     <Collapse 
                     in={expand} 
                     transitionDuration="auto" 
                     unmountOnExit
                     style={cardContentStyle}>
                         <CardContent> {post.text}</CardContent>
                     </Collapse>
                </Card>
            )
        }

       return posts = posts.map(post => generateCard(post))
    }

    navigate(e){
        history.push(e.currentTarget.dataset.route)
    }

    setRecentPosts(posts){
        this.setState({
            posts:posts,
            showLoading:false
        })
    }

    setLoading(){
        this.setState({
            showLoading:true
        })
    }

    handleExpandClick(id){
        if(id === this.state.expanded){
            id = 0
        }
        this.setState({
            expanded:id
        })
    }
}

export default HomePage
