import { EventEmitter } from 'events';

import AuthApi from '../../ApiHelpers/AuthApi'
import dispatcher from '../../dispatcher';
import * as types from '../../actions/user/userActionsTypes';

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.user = {}

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    login(user) {
        AuthApi.loginReq(user).then(respond => {
            if(respond.errors.length){
                this.user = respond.data.userData
            }
            this.emit(types.USER_LOGGED_IN, respond);
        })
    }

    logout() {
        this.emit(types.USER_LOGGED_OUT);
    }

    /**
     * @name register
     * @desc call API to register a given user
     * @param {Object} user 
     */
    register(user) {
        AuthApi.registerReq(user).then(respond => {
            if(respond.errors.length){
                this.user = respond.data.userData
            }
            this.emit(types.USER_REGISTERED, respond);
        })
    }

    /**
     * @name handleAction
     * @desc Handle possible actions
     * @param {Object} action 
     */
    handleAction(action) {
        switch(action.type) {
            case types.USER_REGISTER: {
                this.register(action.payload);
                break;
            }
            case types.USER_LOGIN: {
                this.login(action.payload);
                break;
            }
            default: {
                throw new Error('Unknown action passed the store');
            }
        }
    }
}

let userStore = new UserStore();
dispatcher.register(userStore.handleAction);

export default userStore;
