import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AppNavigation from './AppNavigation';
import history from '../../../history';

class AppHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navigation: {
                opened: false
            }
        };

        this.toggleNavigation = this.toggleNavigation.bind(this);
        this.changeRoute = this.changeRoute.bind(this);
    }

    render() {
        let loggedInUsername = localStorage.getItem('reactive_blog_user'),
            appHeaderPartial = null;

        if (loggedInUsername) {
            appHeaderPartial = `Hello ${loggedInUsername}`;
        } else {
            appHeaderPartial = 
                <div>
                    <Button data-route="/auth/login" color="contrast" onClick={this.changeRoute}>Login</Button>
                    <Button data-route="/auth/register" color="contrast" onClick={this.changeRoute}>Register</Button>
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

    changeRoute(event) {
        history.push(event.currentTarget.dataset.route);
    }
}

AppHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default AppHeader;
