import { EventEmitter } from 'events';

import dispatcher from '../../dispatcher';
import * as types from '../../actions/user/userActionsTypes';

class UserStore extends EventEmitter {
    constructor() {
        super();

        this.register = this.register.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    /**
     * @name register
     * @desc call API to register a given user
     * @param {Object} user 
     */
    register(user) {
        // TODO: Call api
        if (true/*API return success*/) {
            // REPLACE mockData with data received from API promise (then)
            let mockData = {user}

            this.emit(types.USER_REGISTERED, mockData);
        }
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
            default: {
                throw new Error('Unknown action passed the store');
            }
        }
    }
}

let userStore = new UserStore();
dispatcher.register(userStore.handleAction);

export default userStore;
