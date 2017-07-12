import * as types from './userActionsTypes';
import dispatcher from '../../dispatcher';

const userActions = {
    register: (user) => {
        dispatcher.dispatch({
            type: types.USER_REGISTER,
            payload: user
        });
    },
    login: (user) => {
        dispatcher.dispatch({
            type: types.USER_LOGIN,
            payload: user
        });
    },
    authenticate: (token) => {
        dispatcher.dispatch({
            type: types.USER_AUTHENTICATE,
            payload: token
        });
    },
    logout: () => {
        dispatcher.dispatch({
            type: types.USER_LOG_OUT
        })
    }
};

export default userActions;
