import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';

import PrivateRoute from './components/auth/PrivateRoute';

import AppHeader from './components/shared/layout/AppHeader';

import HomePage from './components/home/HomePage';
import UserPage from './components/user/UserPage';

import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import NotFoundPage from './components/shared/NotFoundPage';

import PostForm from './components/post/PostForm';
import PostDetails from './components/post/PostDetails'

import './AppStyles.css';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "Reactive Blog"
        };
    }

    render() {
        let createPostRoute = PrivateRoute(PostForm,'path="/posts/create"')
        return (
            <MuiThemeProvider>
                <div id="app-wrapper">
                    <AppHeader title={this.state.name} />
                    
                    <div id="views-wrapper">
                        <Switch>
                            <Route exact path='/' component={ HomePage } />
                            <Route exact path='/user/:id' component={ UserPage } />

                            <Route path='/auth/login' component={ LoginPage } />
                            <Route path='/auth/register' component={ RegisterPage } />

                            <Route exact path='/posts/details/:id' component={ PostDetails } />
                            {createPostRoute}

                            <Route path='*' component={NotFoundPage} />
                        </Switch>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
