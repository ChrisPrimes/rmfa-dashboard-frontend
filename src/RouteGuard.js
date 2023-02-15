import React from 'react';
import { Navigate } from "react-router-dom";

import { useAuth } from './service/AuthService'

const RouteGuard = ({ element }) => {
    const auth = useAuth();
    return auth.isLoggedIn() ? element : <Navigate to="/login" replace />;
};

export { RouteGuard }