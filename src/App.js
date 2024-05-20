import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'; // Import only the minified bundle

import './App.css'; // Your project-specific CSS file should come after third-party library imports

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup.js';
import { CartProvider } from './components/ContextReduser.js';
import React from 'react';



function App() {
  return (
    <React.StrictMode>
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<Signup />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
    </React.StrictMode>
  );
}

export default App;
