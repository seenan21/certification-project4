import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

 


    function Navbar() {

        const navigate = useNavigate();


        const logout = () => {
            fetch(`${process.env.REACT_APP_API_URL}/logout`, {
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
              
                Log in Page:
                <button><Link to="/login">Login</Link></button>
                <br></br>
                Log out if you are logged in:
                <button onClick={logout}>Logout</button>
            </div>
        );
    }

    export default Navbar;