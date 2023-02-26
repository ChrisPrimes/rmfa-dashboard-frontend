import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { AuthService } from './service/AuthService';

import { List } from './List'
import { Labels } from './Labels'
import { Nav } from './Nav'
import { Error404 } from './Error404'
import { RouteGuard } from './RouteGuard'
import { Login } from './Login'
import { Logout } from './Logout'
import { RemoteDisplayFrame } from './RemoteDisplayFrame'
import { Home } from './Home'

import './style.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  useEffect(() => {
    if (AuthService.isSessionExpired()) {
      AuthService.logout();
      window.location = '/';
    }
  }, []);

  return (
    <Router>
      <Nav excludeRoutes={["/login", "/error"]} />
          <Routes>
            <Route
              path="/"
              element={<RouteGuard element={<Home />} />}
            />
            <Route
              path="/list"
              element={<RouteGuard element={<List />} />}
            />
            <Route
              path="/labels"
              element={<RouteGuard element={<Labels />} />}
            />
            <Route
              path="/remotedisplay"
              element={<RouteGuard element={<RemoteDisplayFrame />} />}
            />

            {/* Login and logout */}
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/logout"
              element={<Logout />}
            />

            {/* Error and catch all routes */}
            <Route path="/error" element={<Error404 />} />
            <Route path="*" element={<Navigate to="/error" />} />
          </Routes>
    </Router>
  );
}

export default App;