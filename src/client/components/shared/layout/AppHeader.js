import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserStore from '../../../stores/user/userStore'
import * as types from '../../../actions/user/userActionsTypes'

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
            user:''
        };

        this.toggleNavigation = this.toggleNavigation.bind(this);
        this.navigate = this.navigate.bind(this);
        this.onRespond = this.onRespond.bind(this)
        this.logout = this.logout.bind(this)

        UserStore.on(types.USER_LOGGED_IN, this.onRespond);
        UserStore.on(types.USER_REGISTERED, this.onRespond);
    }

    componentWillUnmount () {
        UserStore.removeListener(types.USER_LOGGED_IN,this.onRespond)
        UserStore.removeListener(types.USER_REGISTERED,this.onRespond)
    }
    

    render() {
        let user = this.state.user,
                   appHeaderPartial = null;
        if (user) {
            appHeaderPartial = (
                <div>
                    <Button>
                        <Avatar size={20} src={user.profilePic} />
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
            user:''
        })
        history.push('/');
    }

    onRespond(response){
        if(response.errors.length === 0){
            this.setState({
                user:response.data.userData
            })
        }
    }
}

AppHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default AppHeader;
