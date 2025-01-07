import React, { useState } from 'react';
import './signing.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from './header.js';

const LogIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result)
                if(result.data === "Success"){
                    sessionStorage.setItem("userEmail", email);
                    console.log(email);
                    navigate('/home')
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Header/>
        <div className="outer-container">
            <div className="middle-container" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
                <div className="inner-container">
                    <h2>Login</h2>
                    <form action="#" onSubmit={handleSubmit}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                        <br />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                        <br />

                        <button type="submit">SUBMIT</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default LogIn;
