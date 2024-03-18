import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import QuizForm from './QuizForm';



const Profile = () => {
const navigate = useNavigate();
const [username, setUsername] = useState('');
const [userId, setUserId] = useState('');
const [quizzes, setQuizzes] = useState([]); // Add this line

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
  }

  const decodedToken = jwtDecode(token);
  const { userId, username } = decodedToken;

  setUsername(username); // Set the state variable
  setUserId(userId); // Set the state variable
  
}, []);


  const handleViewQuizzes = async () => {
    alert('Viewing all quizzes');

    const response = await axios.get(`http://localhost:3001/user/${username}/quiz`, { params: { username } });
    console.log(response.data);
    setQuizzes(response.data); // Assuming response.data contains the quizzes
};


  
    const handleViewQuiz = (quiz) => {
        alert('Viewing a quiz');
        navigate(`/quiz/${quiz._id}`, { state: { username, userId, quizId: quiz._id } });
    }

    const handleDeleteQuiz = (quiz) => {
        alert('Deleting a quiz');
        // Make API call to delete the quiz with the given quizId
        // Update the quizzes state accordingly
    }


    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <h1>Profile for {username}</h1>
                <h2>Quizzes</h2>
                <ul>
                    {quizzes.map((quiz) => (
                        <li key={quiz._id}>
                            Title: {quiz.title}<br></br>
                            Date Quiz made: {quiz.date} <br></br>
                            Total points: {quiz.points} <br></br>
                            Attempted: {quiz.isAttempted ? 'Yes' : 'No'} <br></br>  
                            <button onClick={() => handleViewQuiz(quiz)}>View Quiz</button>
                            <button onClick={() => handleDeleteQuiz(quiz)}>Delete Quiz</button>
                            
                        </li>
                    ))}
                </ul>
                <button onClick={handleViewQuizzes}>View All Quizzes</button>
            </div>

            <div style={{ flex: 1 }}>
                
                <QuizForm username={username} setQuizzes={setQuizzes}/>
            </div>
        </div>
    );
};

export default Profile;