import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppRoutes from './Routes';

function App() {
  return (
   

    <Router>
      <AppRoutes />

      <div>
      Click here to log in:
      <Link to ="/login">Login</Link>
      </div>
    </Router>
    
  );
}

export default App;
