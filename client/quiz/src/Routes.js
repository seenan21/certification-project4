import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import QuizViewer from './components/QuizViewer';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/user/:username" element={<Profile />} />
      <Route path="/quiz/:quizId" element={<QuizViewer />} />
      {/* Define other routes here */}
    </Routes>
  );
}

// The plan is to make the redux store update whenever a page is loaded through api calls such that the express session is checked to see if user is

export default AppRoutes;
