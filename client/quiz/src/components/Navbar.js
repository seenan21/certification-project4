import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

 


    function Navbar() {

        const navigate = useNavigate();


        const logout = () => {
            fetch('http://localhost:3001/logout', {
                method: 'GET',
                credentials: 'include'
            })
                .then(response => {
                    if (response.status === 302) {
                        alert('Logout successful');
                        navigate('/login');
                    }
                })
                .catch(error => {
                    alert('Logout failed: ' + error.message);
                });
        };

        return (
            <div>
                Click here to register:
                Click here to log in:
                <button><Link to="/login">Login</Link></button>
                <br></br>
                Click here to log out:
                <button onClick={logout}>Logout</button>
            </div>
        );
    }

    export default Navbar;