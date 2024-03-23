import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuizForm from './QuizForm';





const Profile = () => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data from the server
                const response = await axios.get('http://localhost:3001/user', {
                    withCredentials: true // Include credentials (cookies)
                });

                if (response.status === 200) {
                    // If the request is successful, update the state with user data
                    alert("bruh");
                    setUsername(response.data.userName);
                    setUserId(response.data.userId);
                } else {
                    // If the request fails, show an error message
                    console.error('Failed to fetch user data:', response.data.message);
                }
            } catch (error) {
                // If an error occurs, log the error and show an error message
                console.error('Error fetching user data:', error);
            }
        };

        fetchData(); // Call the fetchData function

    }, []); // Empty dependency array indicates this effect should only run once, on component mount

    return (
        <div>
            <h1>Profile Page for {username}</h1>
        </div>
    );
};

export default Profile;


  