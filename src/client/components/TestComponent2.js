import React, { Component } from 'react'

class TestComponent2 extends Component {
    constructor (props) {
        super(props)
        
        this.state ={
            id:this.props.match.params.id,
            qs: this.props.location.search
        } 
    }

    render () {
        return (
            <div>
                The id is {this.state.id}
                The qs is {this.state.qs}
            </div>
        )
    }
}

export default TestComponent2