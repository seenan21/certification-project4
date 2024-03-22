const { Quiz, Question } = require('../models/Quiz');
const User = require('../models/User');
const mongoose = require('mongoose');



createQuiz = async (req, res) => {

    const { username, title, date, questions, isAttempted, points } = req.body;
    console.log(username)
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
                console.log(mongoose.connection.readyState);

        const quiz = new Quiz({
            title,
            date,
            questions,
            isAttempted,
            points,
        });
        console.log(quiz);
        // Save the quiz to the database
        await quiz.save();

        // Add the quiz to the user's quizzes array
        user.quizzes.push(quiz);
        await user.save();

        // Send the quiz in the response
        res.json(quiz);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
    

//This creates a question given input and pushes it to a specific quiz, so quiz must be "created" before a question can be added to it.
createQuestion = async (req, res) => {
    const { quizId } = req.params;
    const { question, options, correctAnswer } = req.body;
    try {
        const quiz = await Quiz.findById(quizId);
        quiz.questions.push({ question, options, correctAnswer });
        await quiz.save();
        res.status(201).json(quiz.questions[quiz.questions.length - 1]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

openQuiz = async (req, res) => {   
   const { username, quizId } = req.params;
    try {
        const user = await User
            .findOne({ username })
            .populate('quizzes');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    }

    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

openQuizzes = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User
            .findOne({ username })
            .populate('quizzes');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.quizzes);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

deleteQuiz = async (req, res) => {
    const { username, quizId } = req.params;
    try {
        const user = await User.findOne
            ({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        await quiz.remove();
        res.status(200).json({ message: 'Quiz deleted' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

addQuestion = async (req, res) => {
    const {quizId, question, options, correctAnswer } = req.body;
    try {
        const quiz = await Quiz.findById(quizId);
        quiz.questions.push({ question, options, correctAnswer });
        await quiz.save();
        res.status(201).json(quiz.questions[quiz.questions.length - 1]);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

deleteQuestion = async (req, res) => {
    const { quizId, questionIndex } = req.params;
    try {
        const quiz = await Quiz.findById(quizId);
        quiz.questions.splice(questionIndex, 1);
        await quiz.save();
        res.status(200).json({ message: 'Question deleted' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}



// Quiz-related routes:

// /quizzes: Retrieve all quizzes available in the system.
// /quizzes/:quizId: Retrieve a specific quiz.
// /quizzes/:quizId/questions: Retrieve all questions for a specific quiz.
// /quizzes/:quizId/questions/:questionId: Retrieve a specific question for a quiz.
// JSON file handling routes:

module.exports = { createQuiz, createQuestion, openQuiz, openQuizzes, deleteQuiz, addQuestion, deleteQuestion};