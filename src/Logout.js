import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { AuthService } from './service/AuthService'

const Logout = () => {
    useEffect(() => {
        AuthService.logout();
    }, [])

    return <Navigate to="/" replace />;
}

export { Logout };