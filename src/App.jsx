// Updated App.jsx
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Main/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import User from './pages/Main/User';
import Admin from './pages/Main/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './pages/Auth/ForgotPassword';


function App() {
  return (
    <GoogleOAuthProvider 
      clientId="624463016753-imk4mahiifcnd5bhpqspsfceg0oj5ec1.apps.googleusercontent.com"
      onScriptLoadError={() => console.log('Failed to load Google script')}
      onScriptLoadSuccess={() => console.log('Google script loaded successfully')}
    >
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        } />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;