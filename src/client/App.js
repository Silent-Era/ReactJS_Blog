import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import HomePage from './components/home/HomePage'
import NotFoundPage from './components/shared/NotFoundPage'

class App extends Component {
    render() {
        return (
            <div className="app-wrapper">
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='*' component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
