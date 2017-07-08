import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HomePage extends Component {
    render () {
        return (
            <div>
                <Link to="/test">Test</Link>
                Hello from home page 2
            </div>
        )
    }
}

export default HomePage