import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppRoutes from './Routes';
import { Provider } from 'react-redux'; 
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore
import rootReducer from './redux/rootReducer'; // Import rootReducer

const store = configureStore({
  reducer: rootReducer, 
});


function App() {
  return (
   
    <Provider store={store}>
      <Router>
        <div>
        Click here to log in:
        <Link to ="/login">Login</Link>
        </div>
        <AppRoutes />

        
      </Router>
    </Provider>
    
  );
}

export default App;
