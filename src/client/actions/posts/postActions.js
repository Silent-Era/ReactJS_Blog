import * as postActionTypes from './postActionTypes'
import dispatcher from '../../dispatcher'

let postActions = {
    createPost: (post) => {
        dispatcher.dispatch({
            type:postActionTypes.CREATE_POST,
            payload:post
        })
    },
    getRecentPosts:() => {
        dispatcher.dispatch({
            type:postActionTypes.GET_RECENT_POSTS
        })
    }
}

export default postActions