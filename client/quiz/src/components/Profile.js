import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuizForm from './QuizForm';





const Profile = () => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user', {
                    withCredentials: true // Include credentials (cookies)
                });

                if (response.status === 200) {
                    setUsername(response.data.userName);
                    setUserId(response.data.userId);
                


                } else {
                    console.error('Failed to fetch user data:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData(); 

    }, []); 

    

    const handleGetQuizzes = async () => {
        try {// it will use the username quiz url to get the quizzes
            alert("Getting Quizzes");
            const response = await axios.get(`http://localhost:3001/user/${username}/quiz`, {
                withCredentials: true // Include credentials (cookies)
            });

            if (response.status === 200) {
                setQuizzes(response.data);
            } else {
                console.error('Failed to fetch quizzes:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    }



    return (
        <div>
            <h1>Profile Page for {username}</h1>

            <h3>Press this button to retrieve all the quizzes</h3>
            <button onClick={handleGetQuizzes}>Get Quizzes</button>
            <h3>Quizzes:</h3>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>{quiz.title}</li>
                ))}
            </ul>


        </div>
        
    );
};

export default Profile;


  