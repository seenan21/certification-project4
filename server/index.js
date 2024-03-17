const db = require('./db')
const express = require('express');

const bodyParser = require('body-parser');
const signUpRoutes = require('./routes/signUpRoutes');
const quizRoutes = require('./routes/quizRoutes');

const session = require('express-session');
const User = require('./models/User');
const app = express();




// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(signUpRoutes);
app.use(quizRoutes);

// Session middleware
app.use(session({
  secret: 'secret-key', // Secret key used to sign the session ID cookie
  resave: false,
  saveUninitialized: true
}));

// To authenticate users
const authenticateUser = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    //go to login page
    res.redirect('/login');
  }
};

app.use('/user/:username/*', authenticateUser);

app.get('/user/:username', (req, res) => {
    res.send('Welcome to your profile page');
    });

app.get('/', (req, res) => {
    res.send('Welcome to the Quiz App');
    });


// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

   const isPasswordValid = (password === user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    req.session.userId = user._id;
    req.session.username = user.username;
    res.redirect(`/user/${username}`);

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});



// Authentication:

// /signup: Register a new user.
// /login: Log in an existing user.
// /logout: Log out the current user.
// User-related routes:

// /users/:userId: Retrieve user information (profile, statistics, etc.).
// /users/:userId/quizzes: Retrieve quizzes associated with a specific user.
// /users/:userId/quizzes/:quizId: Retrieve a specific quiz associated with a user.
// /users/:userId/quizzes/create: Create a new quiz for a user.
// /users/:userId/quizzes/:quizId/edit: Edit an existing quiz for a user.
// /users/:userId/quizzes/:quizId/delete: Delete a quiz for a user.
// Quiz-related routes:

// /quizzes: Retrieve all quizzes available in the system.
// /quizzes/:quizId: Retrieve a specific quiz.
// /quizzes/:quizId/questions: Retrieve all questions for a specific quiz.
// /quizzes/:quizId/questions/:questionId: Retrieve a specific question for a quiz.
// JSON file handling routes:

// /json/save: Save a quiz to a JSON file.
// /json/load: Load a quiz from a JSON file.