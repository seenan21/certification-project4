import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppRoutes from './Routes';
import { Provider } from 'react-redux'; 
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore


const store = configureStore({
  reducer: rootReducer, 
});


function App() {
  return (
   
    <Provider store={store}>
      <Router>
        <AppRoutes />

        <div>
        Click here to log in:
        <Link to ="/login">Login</Link>
        </div>
      </Router>
    </Provider>
    
  );
}

export default App;
