import React, { useState } from 'react';
import { loginSuccess } from './actions';
import { useDispatch } from 'react-redux';



function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        try {
            //login
            const userId = "bruh"; // asyn call to server to be implemented
            dispatch(loginSuccess(userId));    
        }
        catch (error) {
      // Handle login error
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
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
            <button type="submit">Submit</button>
        </form>
    );
}

export default Login;