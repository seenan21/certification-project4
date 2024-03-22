import React, { useState } from 'react';
import { loginSuccess } from '../redux/actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



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


           
            //login
            const response = await axios.post('http://localhost:3001/login', { username, password });
            if (response.status === 200) {
                alert('Login successful');
                navigate(`/user/${username}`);
            } 
        }
        catch (error) {
        alert('Login failed: ' + error.message);
                            
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