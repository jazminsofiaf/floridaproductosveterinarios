import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from "./Auth"

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const authContext = useContext(AuthContext)    

    const { currentUser, token } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                        <Redirect to="/login" />
                    )
            }
        />
    );
}

export default PrivateRoute;