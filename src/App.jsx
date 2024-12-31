// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AIWriter from './pages/AIWriter';
import SEOWriter from './pages/SEOWriter'; 
import TemplateEditor from './pages/TemplateEditor';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ComplianceAI from './pages/ComplianceAI';
import Translation from './pages/Translation';
import Profile from './pages/Profile';
import HelpCenter from './pages/HelpCenter';
import DocumentManagement from './pages/DocumentManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-writer" element={<AIWriter />} />
        <Route path="/seo-writer" element={<SEOWriter />} />  
        <Route path="/compliance" element={<ComplianceAI />} /> 
        <Route path="/translation" element={<Translation />} />
        <Route path="/documents" element={<DocumentManagement />} />
        <Route path="/help" element={<HelpCenter />} />  
        <Route path="/profile" element={<Profile />} />
        <Route path="/ai-writer/template/:templateId" element={<TemplateEditor />} />
      </Routes>
    </Router>
  );
}

export default App;