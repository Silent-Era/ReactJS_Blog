import React, { Component } from 'react'

class TestComponent extends Component {
    constructor (props) {
        super(props)
        
        this.state={
            qs:this.props.location.search
        }
    }
    
    render () {
        return (
            <div>
                Hello from TestComponent
                Query:{this.state.qs}
            </div>
        )
    }
}

export default TestComponent