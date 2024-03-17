import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';



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


    const handleCreateQuiz = () => {
        // Logic to handle creating quizzes
    };

    return (
        <div>
            <h1>Profile for {username}</h1>
            <h2>Quizzes</h2>
            <ul>
                //Make list items clickable to view quiz deta
                {quizzes.map((quiz) => (
                    <li key={quiz.id}>
                        Title: {quiz.title}<br></br>
                        Date Quiz made: {quiz.date} <br></br>
                        Total points: {quiz.points} <br></br>
                        Attempted: {quiz.isAttempted ? 'Yes' : 'No'} <br></br>                     
                        
                        </li>
                ))}
            </ul>
            <button onClick={handleViewQuizzes}>View All Quizzes</button>
            <button onClick={handleCreateQuiz}>Create Quiz</button>
        </div>
    );
};

export default Profile;