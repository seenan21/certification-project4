const express = require('express');
const signUpRoutes = express.Router();
const userController = require('../controllers/userController');

// Routes
signUpRoutes.post('/signup', userController.createUser);


signUpRoutes.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});



// Export the router object
module.exports = signUpRoutes;
