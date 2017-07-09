import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import AppNavigation from './AppNavigation';

class AppHeader extends Component {
    constructor() {
        super();

        this.state = {
            navigation: {
                opened: false
            }
        };

        this.toggleNavigation = this.toggleNavigation.bind(this);
    }

    render() {
        return (
            <header>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={this.toggleNavigation} color="contrast" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>

                        <Typography type="title" color="inherit">
                            {this.props.title}
                        </Typography>
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
}

AppHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default AppHeader;
