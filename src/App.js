import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { List } from './List'
import { Labels } from './Labels'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<List />}
        />
        <Route
          path="/labels"
          element={<Labels />}
        />
      </Routes>
    </Router>
  );
}

export default App;