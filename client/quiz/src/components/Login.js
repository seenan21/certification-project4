import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
    const navigate = useNavigate();

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
            // Login
            const response = await axios.post('http://localhost:3001/login', { username, password }, {
                withCredentials: true 
            });

            if (response.status === 200) {
                alert('Login successful');
                navigate('/user/' + username);}
            else {
                alert('Login failed: ' + response.data.message);
            }
        }
        catch (error) {
            alert('Login failed: ' + error.message);
        }
    }


                            


    const handleSignup = async (username, password) => {
        try {
            // Signup
            const response = await axios.post('http://localhost:3001/signup', { username, password }, {
                withCredentials: true // Include credentials (cookies)
            });

            if (response.status === 201) {
                alert('Signup successful');
            } else {
                alert('Signup failed: ' + response.data.message);
            }
        } catch (error) {
            alert('Signup failed: ' + error.message);
        }
    }

    return (
        <div>
            <h1 style={{ margin: 'auto', width: '50%' }}>Login/Register Page</h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '40vh' }}>
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
                <div style={{ display: 'flex', justifyContent: 'spaceAround' }}>
                    <button onClick={() => handleLogin(username, password)}>Login</button>
                    <button onClick={() => handleSignup(username, password)}>Signup</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
