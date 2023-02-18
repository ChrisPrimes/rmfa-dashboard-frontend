import React from 'react';
import { Navigate } from "react-router-dom";

import { AuthService } from './service/AuthService'

const RouteGuard = ({ element }) => {
    return AuthService.isLoggedIn() ? element : <Navigate to="/login" replace />;
};

export { RouteGuard }