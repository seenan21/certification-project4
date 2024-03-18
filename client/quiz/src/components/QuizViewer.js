import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizViewer = ({ username, userid, quizid }) => {
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([{}]);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`/api/quizzes/${quizid}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchQuiz();
    }, [quizid]);

    const handleRemoveQuestion = (questionId) => {
        // Make API call to remove the question with the given questionId
        // Update the quiz state accordingly
    };

    return (
        <div className="quiz-viewer">
            {quiz && (
                <div>
                    <h2>{quiz.title}</h2>
                    <p>Date: {quiz.date}</p>
                    <h3>Questions</h3>
                    <ul>
                        {quiz.questions.map((question) => (
                            <li key={question._id}>
                                {question.question}
                                <button onClick={() => handleRemoveQuestion(question._id)}>
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

}

export default QuizViewer;