import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles';
import AppHeader from './components/shared/layout/AppHeader';

import HomePage from './components/home/HomePage';
import UserPage from './components/user/UserPage';

import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import NotFoundPage from './components/shared/NotFoundPage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider>
                    <div id="app-wrapper">
                        <AppHeader title={this.props.name} />

                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route exact path='/user/:id' component={UserPage} />

                            <Route exact path='/auth/login' component={LoginPage} />
                            <Route exact path='/auth/register' component={RegisterPage} />

                            <Route path='*' component={NotFoundPage} />
                        </Switch>
                    </div>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

App.prototypes = {
    name: PropTypes.string.isRequired
};

export default App;
