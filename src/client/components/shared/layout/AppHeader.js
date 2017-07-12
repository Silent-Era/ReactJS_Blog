import React, { Component } from 'react';
import PropTypes from 'prop-types';
import userStore from '../../../stores/user/userStore';
import userActions from '../../../actions/user/userActions';
import * as types from '../../../actions/user/userActionsTypes';

import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar'
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ExitToApp from 'material-ui-icons/ExitToApp';

import AppNavigation from './AppNavigation';
import history from '../../../history';

class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navigation: {
                opened: false
            },
            user: userActions.authenticate(localStorage.getItem('token')) 
        };

        this.toggleNavigation = this.toggleNavigation.bind(this);
        this.navigate = this.navigate.bind(this);
        this.logout = this.logout.bind(this);
        this.onAuthenticationUpdate = this.onAuthenticationUpdate.bind(this)

        userStore.on(types.USER_AUTHENTICATED, this.onAuthenticationUpdate);
        userStore.on(types.USER_LOGGED_OUT, this.onLogoutSuccess.bind(this))
    }

    onAuthenticationUpdate(authenticatedUser) {
        this.setState({
            user: authenticatedUser
        })
    }

    onLogoutSuccess(){
        this.setState({
            user: null
        })
        history.push('/')
    }

    componentWillUnmount() {
        userStore.removeListener(types.USER_AUTHENTICATED, this.onAuthenticationUpdate);
        userStore.removeListener(types.USER_LOGGED_OUT, this.onLogoutSuccess);
    }

    render() {
        let appHeaderPartial = null;

        if (this.state.user) {
            let avatarUrl = this.state.user.profilePic
            if(avatarUrl[0] === '.') 
                avatarUrl = process.env.PUBLIC_URL + avatarUrl.substring(1)
                
            appHeaderPartial = (
                <div>
                    <Button data-route="/user/profile">
                        <Avatar
                            size={20}
                            src={ avatarUrl }
                        />
                    </Button>

                    <IconButton color="contrast" data-route="/auth/logout" onClick={this.logout}>
                        <ExitToApp />
                    </IconButton>
                </div>
            );
        } else {
            appHeaderPartial = <div>
                <Button data-route="/auth/login" color="contrast" onClick={this.navigate}>Login</Button>
                <Button data-route="/auth/register" color="contrast" onClick={this.navigate}>Register</Button>
            </div>;
        }

        return (
            <header>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={this.toggleNavigation} color="contrast" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>

                        <Typography style={{"flex": "1"}} type="title" color="inherit">
                            {this.props.title}
                        </Typography>
    
                        {appHeaderPartial}
                    </Toolbar>
                </AppBar>

                <AppNavigation title={this.props.title} opened={this.state.navigation.opened} onToggle={this.toggleNavigation} />
            </header>
        );
    }

    toggleNavigation() {
        this.setState({
            navigation: {
                opened: !this.state.navigation.opened
            }
        })
    }

    navigate(event) {
        history.push(event.currentTarget.dataset.route);
    }

    logout() {
        userActions.logout()
    }
}

AppHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default AppHeader;
