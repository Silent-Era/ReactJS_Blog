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
            <section>
                <h2>Login</h2>

                <form>
                    <div>
                        <TextField
                            name="title"
                            label="Title of the post"
                            value={this.state.post.title}
                            onChange={this.onInputChange}
                        />
                    </div>

                    <div>
                         {/*<TextField
                            name="text"
                            label="Post Content"
                            value={ this.state.post.text }
                            onChange={ this.onInputChange }
                            multiLine={true}
                            rows={30}
                            cols={30}
                        />*/}
                        <textarea 
                        name="text" id="text" 
                        cols="100" rows="30"
                        onChange={ this.onInputChange }
                        value={ this.state.post.value}></textarea>
                    </div>

                    <div>
                        <TextField
                            name="background"
                            label="Header for the post"
                            value={ this.state.post.background }
                            onChange={ this.onInputChange }
                        />
                    </div>

                    <div style={{margin:"10px 0"}}>
                        <Button  raised onClick={ this.onSubmit }>Make a Post!</Button>
                    </div>
                </form>
            </section>
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