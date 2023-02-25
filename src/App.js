import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import classNames from "classnames";

import { AuthService } from './service/AuthService';

import { List } from './List'
import { Labels } from './Labels'
import { Nav } from './Nav'
import { Error404 } from './Error404'
import { RouteGuard } from './RouteGuard'
import { Login } from './Login'
import { Logout } from './Logout'
import { Frame } from './Frame'
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
      <div className={classNames("h-100", {
        "container-fluid": true
      })}>
        <main role="main" className="h-100">
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
              path="/frame"
              element={<RouteGuard element={<Frame />} />}
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
        </main>
      </div>
    </Router>
  );
}

export default App;