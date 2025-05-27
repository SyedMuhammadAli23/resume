import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResumeGenerationPage from './pages/ResumeGenerationPage';
import TemplateSelectionPage from './pages/TemplateSelectionPage';
import ResumePreviewPage from './pages/ResumePreviewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ResumeGenerationPage />} />
        <Route path="/resume-generation" element={<ResumeGenerationPage />} />
        <Route path="/template-selection" element={<TemplateSelectionPage />} />
        <Route path="/resume-preview" element={<ResumePreviewPage />} />
      </Routes>
    </Router>
  );
}

export default App; 