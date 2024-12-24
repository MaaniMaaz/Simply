import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AIWriter from './pages/AIWriter';
import TemplateEditor from './pages/TemplateEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-writer" element={<AIWriter />} />
        <Route path="/ai-writer/template/:templateId" element={<TemplateEditor />} />
      </Routes>
    </Router>
  );
}

export default App;