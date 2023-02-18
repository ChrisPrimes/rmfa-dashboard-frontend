import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import { List } from './List'
import { Labels } from './Labels'
import { Nav } from './Nav'
import { Error404 } from './Error404'
import { RouteGuard } from './RouteGuard'
import { Login } from './Login'
import { Logout } from './Logout'

import './style.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

  useEffect(() => {
    apiFetch("https://www.rochestermfa.org/api/rmfa/v1/collection/list?collection_number=-1");
  }, []);

const App = () => {
  return (
    <Router>
      <Nav excludeRoutes={["/login", "/error"]} />
      <div className="container-fluid h-100">
        <main role="main" className="h-100">
          <Routes>
            <Route
              path="/"
              element={<RouteGuard element={<List />} />}
            />
            <Route
              path="/labels"
              element={<RouteGuard element={<Labels />} />}
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