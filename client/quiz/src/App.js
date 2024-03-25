import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppRoutes from './Routes';
import { Provider, useDispatch } from 'react-redux'; 
import { configureStore } from '@reduxjs/toolkit'; // Import configureStore
import rootReducer from './redux/rootReducer'; // Import rootReducer
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { UseDispatch } from 'react-redux';

const store = configureStore({
  reducer: rootReducer, 
});



function App() {
 
  


  
  return (
   
    <Provider store={store}>
      <Router>
        <Navbar />
        
       
        <AppRoutes />

        
      </Router>
    </Provider>
    
  );
}

export default App;
