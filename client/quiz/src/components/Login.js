import React, { useState } from 'react';
import { loginSuccess } from '../redux/actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (username, password) => {
        try {

            const token = localStorage.getItem('token');

            const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                },
            };
            //login
            const response = await axios.post('http://localhost:3001/login', { username, password }, config);
            
            if (response.status === 200) {
                

                const token = response.data.token;
                localStorage.setItem('token', token);  
                const decodedToken = jwtDecode(token);
                const { userId, username } = decodedToken;

                // Dispatch action to update Redux store with userId
                dispatch(loginSuccess(userId));
                // Redirect to another view (e.g., dashboard)
                navigate(`/user/${username}`);
                alert('Login successful');
            } else {
                // Handle unsuccessful login
                console.error('Login failed:', response.data.message);
                alert('Login failed');
            }
        }
        catch (error) {
      // Handle login error
        }
    }

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        alert("submitting")
        await handleLogin(username, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    );
}

export default Login;