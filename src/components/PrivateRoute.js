import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../utils/authContext';


function PrivateRoute({ component: Component, ...rest }) {
    const { currUser } = useAuth()

    return (
        <Route
        {...rest}
        render={props => {
            console.log(currUser)
            return currUser ? <Component {...props} /> : <Redirect to='/login' />
        }}
        >
        </Route>
    )
}

export default PrivateRoute
