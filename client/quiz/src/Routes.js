import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* Define other routes here */}
    </Routes>
  );
}

export default AppRoutes;
