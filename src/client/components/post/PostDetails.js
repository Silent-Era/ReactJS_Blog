import React, { Component } from 'react'

class componentName extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            post: null
        }
    }

    
    componentWillMount () {
        
    }
    
    
    render () {
        return (
            <div>
                Post details + {this.props.match.params.id}
            </div>
        )
    }
}

export default componentName