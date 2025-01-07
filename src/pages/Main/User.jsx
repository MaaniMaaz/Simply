import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../UserPages/Dashboard';
import AIWriter from '../UserPages/AIWriter';
import SEOWriter from '../UserPages/SEOWriter';
import TemplateEditor from '../UserPages/TemplateEditor';
import ComplianceAI from '../UserPages/ComplianceAI';
import Translation from '../UserPages/Translation';
import Profile from '../UserPages/Profile';
import HelpCenter from '../UserPages/HelpCenter';
import DocumentManagement from '../UserPages/DocumentManagement';
import TemplateBuilder from '../UserPages/TemplateBuilder';

const User = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ai-writer" element={<AIWriter />} />
      <Route path="/seo-writer" element={<SEOWriter />} />
      <Route path="/compliance" element={<ComplianceAI />} />
      <Route path="/translation" element={<Translation />} />
      <Route path="/documents" element={<DocumentManagement />} />
      <Route path="/template-builder" element={<TemplateBuilder />} />
      <Route path="/help" element={<HelpCenter />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/ai-writer/template/:templateId" element={<TemplateEditor />} />
    </Routes>
  );
};

export default User;