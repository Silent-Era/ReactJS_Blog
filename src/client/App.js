import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles';
import AppHeader from './components/shared/layout/AppHeader';

import HomePage from './components/home/HomePage';
import UserPage from './components/user/UserPage';

import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import NotFoundPage from './components/shared/NotFoundPage';

import './AppStyles.css';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "Reactive Blog"
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <div id="app-wrapper">


                    <AppHeader title={this.state.name} />
                    
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/user/:id' component={UserPage} />

                        <Route exact path='/auth/login' component={LoginPage} />
                        <Route exact path='/auth/register' component={RegisterPage} />

                        <Route path='*' component={NotFoundPage} />
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
