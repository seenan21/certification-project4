import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/user/:username" element={<Profile />} />
      {/* Define other routes here */}
    </Routes>
  );
}

export default AppRoutes;
