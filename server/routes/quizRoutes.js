const express = require('express');
const quizController = require('../controllers/quizController');

const quizRoutes = express.Router();

// Routes
quizRoutes.post('/user/:username/quiz', quizController.createQuiz);
quizRoutes.post('/user/:username/quiz/:quizId/question', quizController.createQuestion);
quizRoutes.get('/user/:username/quiz/:quizId', quizController.openQuiz);
quizRoutes.get('/user/:username/quiz', quizController.openQuizzes);
quizRoutes.delete('/user/:username/quiz/:quizId', quizController.deleteQuiz);
quizRoutes.put('/user/:username/quiz/:quizId', quizController.createQuestion);
quizRoutes.delete('/user/:username/quiz/:quizId/question/:questionIndex', quizController.deleteQuestion);





// Export the router object
module.exports = quizRoutes;
