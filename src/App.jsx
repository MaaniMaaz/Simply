// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Pages
import Home from './pages/Main/Home';
import User from './pages/Main/User';
import Admin from './pages/Main/Admin';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// User Pages
import Dashboard from './pages/UserPages/Dashboard';
import AIWriter from './pages/UserPages/AIWriter';
import SEOWriter from './pages/UserPages/SEOWriter';
import ComplianceAI from './pages/UserPages/ComplianceAI';
import Translation from './pages/UserPages/Translation';
import Profile from './pages/UserPages/Profile';
import HelpCenter from './pages/UserPages/HelpCenter';
import DocumentManagement from './pages/UserPages/DocumentManagement';
import TemplateEditor from './pages/UserPages/TemplateEditor';
import Support from './pages/UserPages/CustomerSupport';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-writer" element={<AIWriter />} />
        <Route path="/seo-writer" element={<SEOWriter />} />
        <Route path="/compliance" element={<ComplianceAI />} />
        <Route path="/translation" element={<Translation />} />
        <Route path="/documents" element={<DocumentManagement />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />
        <Route path="/ai-writer/template/:templateId" element={<TemplateEditor />} />

        {/* Admin Routes - All admin routes are now handled by the Admin component */}
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;