import React, { Component } from 'react';


import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

const styleSheet = createStyleSheet('AppNavigation', {
    navigationItems: {
        width: 250,
        flex: 'initial',
    },
    navigationItem: {
        padding: 0
    },
    navigationLink: {
        padding: '10px',
        display: 'block',
        width: '100%',
        textDecoration: 'none',
    }
});

class AppNavigation extends Component {
    render() {
        const classes = this.props.classes;

        return (
            <nav>
                <Drawer open={this.props.opened} onRequestClose={this.props.onToggle}>
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            {this.props.title}
                        </Typography>
                    </Toolbar>

                    <List className={classes.navigationItems}>
                        <ListItem className={classes.navigationItem} button>
                            <Link className={classes.navigationLink} to="/" onClick={this.props.onToggle}>
                                <ListItemText primary="Home" />
                            </Link>
                        </ListItem>

                        <ListItem className={classes.navigationItem} button>
                            <Link className={classes.navigationLink} to="/post" onClick={this.props.onToggle}>
                                <ListItemText primary="Posts" />
                            </Link>
                        </ListItem>
                    </List>
                </Drawer>
            </nav>
        );
    }
}

export default withStyles(styleSheet)(AppNavigation);
