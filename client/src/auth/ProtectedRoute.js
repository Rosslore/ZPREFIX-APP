import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = props => {
    const user = null;

    if (!user) return <Redirect to="/login" />;
    
    return <Route {...props} />;
};

export default ProtectedRoute;
