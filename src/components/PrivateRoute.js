import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        sessionStorage.getItem('user') !== null
            ? <Component {...props}/>
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

export default PrivateRoute;
