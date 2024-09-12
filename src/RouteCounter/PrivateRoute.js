import React from 'react'
import { Navigate } from 'react-router-dom';

function PrivateRoutes({ children }) {
    const userData = localStorage.getItem("user_token");
    
    if (userData) {
        return children
    }
    else {
        return <Navigate to={"/"} />
        // return children

    }
}

export default PrivateRoutes