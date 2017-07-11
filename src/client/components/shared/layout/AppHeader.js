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
    }

    onAuthenticationUpdate(authenticatedUser) {
        this.setState({
            user: authenticatedUser
        })
    }

    componentWillUnmount() {
        userStore.removeListener(types.USER_AUTHENTICATED, this.onRespond);
    }

    render() {
        let appHeaderPartial = null;

        if (this.state.user) {
            appHeaderPartial = (
                <div>
                    <Button data-route="/user/profile">
                        <Avatar
                            size={20}
                            src={`${process.env.PUBLIC_URL}${this.state.user.profilePic.substring(1)}`}
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
        localStorage.clear();

        this.setState({
            user: null
        });

        history.push('/');
    }
}

AppHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default AppHeader;
