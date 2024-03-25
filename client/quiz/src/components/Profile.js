import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';




const Profile = () => {
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();
//Call this whenever the page is loaded

useEffect(() => {
    alert("Fetching user data");
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
                withCredentials: true // Include credentials (cookies)
            });

            if (response.status === 200) {
                setUsername(response.data.userName);
                setUserId(response.data.userId);
            } else {
                alert('User is not logged in');
                console.error('Failed to fetch user data:', response.data.message);
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('User is not logged in');
            console.error('Failed to fetch user data');
            navigate('/login')
        }
    };

    fetchData(); 

}, []); 

    

    const handleGetQuizzes = async () => {
        try {// it will use the username quiz url to get the quizzes

            alert("Getting Quizzes");
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${username}/quiz`, {
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

    function createQuiz(title) {
        var points = 0;
        var questions = [];
        var isAttempted = false;
        var date = new Date();

        return async (event) => {
            try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/${username}/quiz/`, { title, date, questions, isAttempted, points }, {
                withCredentials: true // Include credentials (cookies)
            });

            if (response.status === 200) {
                alert('Quiz created successfully');
                handleGetQuizzes();
            } else {
                alert('Failed to create quiz: ' + response.data.error);
            }
            } catch (error) {
            alert('Failed to create quiz: ' + error.message);
            }
        };
    }


    const [quizTitle, setQuizTitle] = useState('');

    const handleTitleChange = (event) => {
        setQuizTitle(event.target.value);
    };

    const handleSubmitQuiz = (event) => {
        event.preventDefault();
        createQuiz(quizTitle)();
    };

    return (
        <div>
            <h1>Profile Page for {username}</h1>

            <h2>Create new empty Quiz</h2>
            <form>
                <input type="text" placeholder="Title" value={quizTitle} onChange={handleTitleChange} />
                <button onClick={handleSubmitQuiz}>Create New Empty Quiz</button>
            </form>

            <h3>Press this button to retrieve all the quizzes</h3>
            <button onClick={handleGetQuizzes}>Get Quizzes</button>
            <h3>Quizzes:</h3>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        <Link to={`/user/${username}/quiz/${quiz._id}`}>{quiz.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;


  