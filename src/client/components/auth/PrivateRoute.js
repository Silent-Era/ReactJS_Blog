import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import userStore from '../../stores/user/userStore'
import PageNotFound from '../../components/shared/NotFoundPage'

const PrivateRoute = (Component, ...rest) => (
    <Route exact {...rest}
        render={props => (
            userStore.isAdmin()
                ? <Component exact {...props} />
                : <PageNotFound />
        )}
    />
);

//<Redirect to={{ pathname: "/auth/login", state: { from: props.location } }} />

export default PrivateRoute;
