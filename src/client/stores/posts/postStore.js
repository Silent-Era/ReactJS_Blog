import { EventEmitter } from 'events'

import requester from '../../utils/requester'
import dispatcher from '../../dispatcher'
import * as types from '../../actions/posts/postActionTypes'

class PostStore extends EventEmitter{
    constructor() {
        super()

        this.posts = null

        this.createPost = this.createPost.bind(this)
        this.handleActions = this.handleActions.bind(this)
    }

    createPost(post){
        let token = localStorage.getItem('token')
        if(token){
            requestCreate.apply(this)
        }
        
        function requestCreate(){
            let options = {
                contentType:'application/json',
                headers:{authorization: 'token ' + token}
            }
            requester.post('/posts/create', JSON.stringify(post), options)
                .then(respond => {
                    this.emit(types.CREATED_POST,respond)
                })
        }
    }

    handleActions(action){
        switch(action.type){
            case 'CREATE_POST': this.createPost(action.payload); break;
           
        }
    }
}

let postStore = new PostStore()
dispatcher.register(postStore.handleActions)

export default postStore