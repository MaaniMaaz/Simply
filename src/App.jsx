// Updated App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Main/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import User from './pages/Main/User';
import Admin from './pages/Main/Admin'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<User />} />
        <Route path="/admin/*" element={<Admin />} />  // New admin routes
      </Routes>
    </Router>
  );
}

export default App;