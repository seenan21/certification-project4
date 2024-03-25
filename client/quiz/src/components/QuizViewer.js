import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../redux/QuizViewerSlice'; 



const QuizViewer = (props) => {
    const [quiz, setQuiz] = useState(null);
    const [questions, setQuestions] = useState([]);

    const location = useLocation();
    const username = location.pathname.split('/')[2];
    const quizId = location.pathname.split('/')[4];

    const dispatch = useDispatch();
    const mode = useSelector((state) => state.quizViewer.mode);


   
   

    const getQuiz = async () => { 
        try {
            const response = await axios.get(`http://localhost:3001/user/${username}/quiz/${quizId}`, {
                withCredentials: true
            });

            
            if (response.status === 200) {
                setQuiz((response.data));
                setQuestions(response.data.questions);
                //alert each quiz question with all its information
            } else {
                console.error('Failed to fetch quiz:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching quiz bruh:', error);
        }
    }

    useEffect(() => {
        alert("Fetching quiz data");
        getQuiz();
    }, []);


    const addQuestion = async (questionText, options, correctOptionIndex, points) => {
    try {
        const response = await axios.post(`http://localhost:3001/user/${username}/quiz/${quizId}`, {
            newQuestion: {
                text: questionText,
                options: options,
                correctOptionIndex: correctOptionIndex,
                points: points
            }
        }, {
            withCredentials: true
        });
        alert('Question added successfully');

        if (response.status === 201) {
            setQuestions([...questions, response.data]);
        } else {
            console.error('Failed to add question:', response.data.message);
        }
    } catch (error) {
        console.error('Error adding question:', error);
        alert('Question not added successfully');
    }
}


    const handleSubmit = (event) => {
        alert('Form submitted!'); // Display alert on form submission
        event.preventDefault(); // Prevent default form submission behavior

        // Gather form data
        const formData = new FormData(event.target);
        const questionText = formData.get('questionText');

        let options = formData.get('options')
        if (options.split(',').length < 4) {
            alert('Please provide at least 4 options');
            return;
        }
        //check if the 4th index is empty
        if (options.split(',')[3] === "") {
            alert('Please provide at least 4 options');
            return;
        }

        options = options.split(',').map(option => option.trim());

        const numberOfOptions = options.length + 1;
        var correctOptionIndex = parseInt(formData.get('correctOptionIndex'));

        if (correctOptionIndex < 1 || correctOptionIndex >= numberOfOptions) {
            alert('Invalid correct option index');
            return;
        }

        correctOptionIndex = correctOptionIndex - 1;

        const points = parseInt(formData.get('points'));

        addQuestion(questionText, options, correctOptionIndex, points);

        // Dispatch action to save the new question (example)
        // dispatch(saveNewQuestion({ questionText, options, correctOptionIndex, points }));

        // Reset form fields (if needed)
};

    const deleteQuestion = async (index, points) => {
        try {
            const response = await axios.delete(`http://localhost:3001/user/${username}/quiz/${quizId}`, {
                data: { index, points }, 
                withCredentials: true
            });

            if (response.status === 200) {
                alert('Question deleted successfully');
                setQuestions(questions.filter((question, i) => i !== index));
            } else {
                console.error('Failed to delete question:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting question:', error);
            alert('Question not deleted successfully');
        }
}


return (
    <div>
        <br></br>
                <br></br>

        <br></br>

        

         <button onClick={() => {
            if (mode === 'viewing') {
                dispatch(setMode('editing')); // Switch to editing mode
            } else {
                // Save action logic goes here
                // Example: dispatch(saveChanges());
                dispatch(setMode('viewing')); 
            }
        }}>
            {mode === 'viewing' ? 'Edit' : 'Save'} {/* Toggle button label based on mode */}
        </button>

        {mode === 'viewing' && quiz && (
            <div>
                <h4>We are now in {mode} mode </h4>
                <h1>{quiz.title}</h1>
                <h2>{quiz.date}</h2>
                <h3>{quiz.points}</h3>
                <h4>{quiz.isAttempted}</h4>
               {questions?.map((question, index) => (
                    <div key={index}>
                        <h4>Question {index + 1}</h4>
                        <p>{question.text}</p>
                        <ul>
                            {question.options?.map((option, optionIndex) => ( // Change 'choices' to 'options'
                                <li key={optionIndex}>{option}</li> // Use 'option' instead of 'choice'
                            ))}
                        </ul>
                        <p>Points: {question.points}</p>
                        <button onClick={() => deleteQuestion(index, question.points)}>Delete</button>


                    </div>
                ))}
            </div>
        )}
        

        {mode === 'editing' && (
            <div>
                
                <h4>We are now in {mode} mode </h4>
                
                
                <div style={{ display: 'flex' }}>
                    {/* Questions to be displayed*/}
                    <div style={{ marginRight: '50vh' }}>
                       {questions?.map((question, index) => (
                        <div key={index}>
                            <h4>Question {index + 1}</h4>
                            <p>{question.text}</p>
                            <ul>
                                {question.options?.map((option, optionIndex) => ( 
                                    <li key={optionIndex} style={{ fontWeight: optionIndex === question.correctOptionIndex ? 'bold' : 'normal' }}>
                                        {option} {optionIndex === question.correctOptionIndex && <span>(Correct)</span>}
                                    </li> 
                                ))}
                            </ul>
                            <p>Points: {question.points}</p>
                        </div>
                    ))}

                    </div>


                    <div>
                        {/* Form to create new questions */}

                        <form onSubmit={handleSubmit}>
                            <h4>Create a New Question</h4>
                            <label>
                                Question Text:
                                <input type="text" name="questionText" required />
                            </label>
                            <br />
                            <label>
                                Options (comma-separated):
                                <input type="text" name="options" required />
                            </label>
                            <br />
                            <label>
                                Correct Option Index:
                                <input type="number" name="correctOptionIndex" required />
                            </label>
                            <br />
                            <label>
                                Points:
                                <input type="number" name="points" required />
                            </label>
                            <br />
                            <button type="submit" >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )}
    
       
    </div>
);



}

export default QuizViewer;