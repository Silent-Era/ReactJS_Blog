import React, { Component } from 'react';


import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import List, { ListItem, ListItemText } from 'material-ui/List';
import { Link } from 'react-router-dom';

import UserStore from '../../../stores/user/userStore'
import * as UserTypes from '../../../actions/user/userActionsTypes' 

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
    constructor (props) {
        super(props)
        
        this.state = {
            showLinksForAuth: false
        }

        UserStore.on(UserTypes.USER_AUTHENTICATED, this.handleStoreChange.bind(this))
        UserStore.on(UserTypes.USER_LOGGED_OUT, this.onLogoutSuccess.bind(this))
    }

    componentWillUnmount() {
        UserStore.removeListener(UserTypes.USER_AUTHENTICATED, this.handleStoreChange)
        UserStore.removeListener(UserTypes.USER_LOGGED_OUT, this.onLogoutSuccess)
    }
    
    render() {
        const classes = this.props.classes;
        let linksForAuth
        if(this.state.showLinksForAuth){
            linksForAuth = (
                 <ListItem className={classes.navigationItem} button>
                    <Link className={classes.navigationLink} to="/posts/create" onClick={this.props.onToggle}>
                        <ListItemText primary="Create A Post" />
                    </Link>
                 </ListItem> )
        }

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
                            <Link className={classes.navigationLink} to="/posts/all" onClick={this.props.onToggle}>
                                <ListItemText primary="Posts" />
                            </Link>
                        </ListItem>

                        { linksForAuth }
                    </List>
                </Drawer>
            </nav>
        );
    }

    onLogoutSuccess(){
        this.setState({
            showLinksForAuth:false
        })
    }

    handleStoreChange(user){
        if(user.roles.indexOf('Admin') > -1){
              this.setState({
                    showLinksForAuth:true
                })
        }
    }
}

export default withStyles(styleSheet)(AppNavigation);
