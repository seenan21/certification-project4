const Quiz = require('../models/Quiz');

createQuiz = async (req, res) => {
    const { title, date, questions, isAttempted, points } = req.body;
    const quiz = new Quiz({ title, date, questions, isAttempted, points });
    try {
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

deleteQuiz = async (req, res) => {
    const { quizId } = req.params;
    try {
        await Quiz.findByIdAndDelete(quizId);
        res.status(204).end();
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