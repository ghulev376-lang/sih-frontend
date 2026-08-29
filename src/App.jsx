import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { FlowProvider } from './context/FlowContext';

import Login from './pages/Login';
import LocationFlow from './pages/LocationFlow';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <FlowProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/location" element={<LocationFlow />} />
              {/* Default root path navigates to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </FlowProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;

