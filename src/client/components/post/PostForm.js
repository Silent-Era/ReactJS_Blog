import React, { Component } from 'react'
import history from '../../history';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import notifier from '../../utils/notifier';

class PostForm extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            post: {
                title:'',
                text: '',
                background: ''
            }
        }

        this.onInputChange = this.onInputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    render () {
        return (
            <div>
                Post View
            </div>
        )
    }

    onInputChange(e){
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        let newState = Object.assign({}, this.state.post, { [fieldName]: fieldValue });

        this.setState({
            post: newState
        });
    }

    onSubmit(e){
        console.log(this.state.post)
    }
}

export default PostForm