import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from './service/AuthService'

const Logout = () => {
    const auth = useAuth();

    useEffect(() => {
        auth.logout();
    }, [auth])

    return <Navigate to="/" replace />;
}

export { Logout };