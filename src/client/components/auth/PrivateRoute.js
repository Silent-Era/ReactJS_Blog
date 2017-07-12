import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import userActions from '../../actions/user/userActions';

const PrivateRoute = ({ component: Component }, ...rest) => (
    <Route {...rest}
        render={props => (
            userActions.authenticate()
                ?<Component  {...props} />
                :<Redirect to={{ pathname: "/auth/login", state: { from: props.location } }} />
        )}
    />
);

export default PrivateRoute;
