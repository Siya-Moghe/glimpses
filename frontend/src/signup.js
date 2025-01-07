import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Header from './header';  // Import Header component
import './signing.css';  // Your existing styles for the sign-up page
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log("Passwords do not match");
            return;
        }

        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Header/>
             
            {/* Sign Up Form */}
            <div className="outer-container">
            
                <div className="middle-container">
                    <div className="inner-container">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name:</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                required 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                            />

                            <label htmlFor="email">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                            />

                            <label htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                            />

                            <label htmlFor="confirm-password">Confirm Password:</label>
                            <input 
                                type="password" 
                                id="confirm-password" 
                                name="confirm-password" 
                                required 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                            />

                            <button type="submit">SUBMIT</button>
                        </form>
                        <br />
                        <p>Already Have An Account? <Link to="/login">Log In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
