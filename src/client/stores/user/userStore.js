import { EventEmitter } from 'events';

import requester from '../../utils/requester'
import dispatcher from '../../dispatcher';
import * as types from '../../actions/user/userActionsTypes';

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.user = null;

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.logout = this.logout.bind(this)
    }

    getUser(){
        return this.user
    }

    isAdmin(){
        if(localStorage.getItem('date')==='true') return true
        if(!this.user) return false
        return this.user.roles.indexOf('Admin') > -1
    }
    
    /**
     * @name authenticate
     * @desc call API to check if user token is valid
     * @param {Object} user 
     */
    authenticate(token) {
        if (token) {
            requester.get('/user/authenticate')
                .then(response => {
                    if (!response.errors.length) {
                        this.user = response.data.userData;
                        this.emit(types.USER_AUTHENTICATED, response.data.userData);
                    }
                });
        } else {            
            return this.user;
        }
    }
    
    /**
     * @name login
     * @desc call API to login a given user
     * @param {Object} user 
     */
    login(user) {
        requester.post('/user/login', JSON.stringify(user), false)
            .then(respond => {
                if (!respond.errors.length) {
                    this.user = respond.data.userData;
                    if(this.user.roles.indexOf('Admin') > -1){
                        localStorage.setItem('date','true')
                    }
                    this.emit(types.USER_AUTHENTICATED, respond.data.userData);
                }

                this.emit(types.USER_LOGGED_IN, respond);
            });
    }

    /**
     * @name logout
     * @desc clear loggedin user information
     */
    logout() {
        this.user = null
        localStorage.clear()
        this.emit(types.USER_LOGGED_OUT)
    }

    /**
     * @name register
     * @desc call API to register a given user
     * @param {Object} user 
     */
    register(user) {
        requester.post('/user/register', JSON.stringify(user), false)
            .then(respond => {
                if (!respond.errors.length) {
                    this.user = respond.data.userData;
                    this.emit(types.USER_AUTHENTICATED, respond.data.userData);
                }

                this.emit(types.USER_REGISTERED, respond);
            });
    }

    /**
     * @name handleAction
     * @desc Handle possible actions
     * @param {Object} action 
     */
    handleAction(action) {
        switch (action.type) {
            case types.USER_REGISTER: {
                this.register(action.payload);
                break;
            }
            case types.USER_LOGIN: {
                this.login(action.payload);
                break;
            }
            case types.USER_AUTHENTICATE: {
                this.authenticate(action.payload);
                break;
            }
            case types.USER_LOG_OUT:{
                this.logout()
                break;
            }
            default: break;
        }
    }
}

let userStore = new UserStore();
dispatcher.register(userStore.handleAction);

export default userStore;
