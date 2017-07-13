import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import userStore from '../../stores/user/userStore'

const PrivateRoute = (Component, ...rest) => (
    <Route {...rest}
        render={props => (
            userStore.isAdmin()
                ? <Component  {...props} />
                : <Redirect to={{ pathname: "/auth/login", state: { from: props.location } }} />
        )}
    />
);

export default PrivateRoute;
