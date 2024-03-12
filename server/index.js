const express = require('express')
const db = require('./db')


const app = express()




const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


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