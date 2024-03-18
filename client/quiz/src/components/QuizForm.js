import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = (props) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Current date
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([{}]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = props.username;
    const setQuizzes = props.setQuizzes;
    // Send quiz data to the server
    //Generate question array based on numQuestions
    let questions = [];

    //
// const questionSchema = new Schema({
    // text: String, // The question text
    // options: [String], // An array of options for the question
    // correctOptionIndex: Number, // Index of the correct option in the options array
    // points : Number,
   for (let i = 1; i < numQuestions; i++) {
    const question = {
      text: event.target[`question-${i}`].value,
      options: [
        event.target[`option1-${i}`].value,
        event.target[`option2-${i}`].value,
        event.target[`option3-${i}`].value,
        event.target[`option4-${i}`].value,
      ],
      correctOptionIndex: parseInt(event.target[`correct-${i}`].value),
      points: 5,
    };
    questions.push(question);
          
    }

   

    try {

        
      const response = await axios.post(`http://localhost:3001/user/${username}/quiz`,  {username, title, date, questions, isAttempted: false, points: 0});
      console.log('Quiz created:', response.data);
      setQuizzes((quizzes) => [...quizzes, response.data]);
      
      // Reset form fields after successful submission
      setTitle('');
      //Current date
        setDate(new Date());
      setNumQuestions(0);

      const quizId = response.data._id;
        // Add questions to the quiz
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const response = await axios.post(`http://localhost:3001/quiz/${quizId}/question`, quizId, question.text, question.options, question.correctOptionIndex, question.points);
            console.log('Question created:', response.data);
            questions.push(response.data);
            
        }

    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

return (
    <div className="quiz-form">
        <h2>Create a New Quiz</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />
            </label>
            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                />
            </label>
            <button type="button" onClick={() => setNumQuestions(numQuestions + 1)}>
                Add Question
            </button>
            <h3>Questions</h3>
            {Array.from({ length: numQuestions }, (_, index) => (
                <div key={index}>
                    <label>
                            Question:
                            <input
                                    type="text"
                                    required
                            />
                    </label>
                    <br />
                    <label>
                            Option 1:
                            <input
                                    type="text"
                                    required
                            />
                    </label>
                    <br />
                    <label>
                            Option 2:
                            <input
                                    type="text"
                                    required
                            />
                    </label>
                    <br />
                    <label>
                            Option 3:
                            <input
                                    type="text"
                                    required
                            />
                    </label>
                    <br />
                    <label>
                            Option 4:
                            <input
                                    type="text"
                                    required
                            />
                    </label>
                    <br />
                    <label>
                            Correct Answer:
                            <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value="1"
                                    required
                            />
                            1
                            <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value="2"
                                    required
                            />
                            2
                            <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value="3"
                                    required
                            />
                            3
                            <input
                                    type="radio"
                                    name={`question-${index}`}
                                    value="4"
                                    required
                            />
                            4
                    </label>
                    <br />
                </div>
            ))}
            <button type="submit">Create Quiz</button>
        </form>
    </div>
);
};

export default QuizForm;
