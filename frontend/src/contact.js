
import React, { useState } from 'react';
import './contact.css'; 
import Header from './header.js'

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle the form submission here (send to backend, email, etc.)
        alert('Form submitted');
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    return (
        <div className="contact-us">
            <Header/>
            <h2 style={{color:'#380412'}}>Contact Us</h2>
            <p>If you have any questions, feedback, or issues, feel free to reach out to us!</p>

            <div className="pink">

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        required 
                    ></textarea>
                </div>

                <button className="sbu" type="submit">Submit</button>
            </form>

            </div>

            <p>Alternatively, you can reach us via email at <strong>support@glimpsesapp.com</strong></p>

            <h3>Follow Us</h3>
            <ul>
                <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
        </div>
    );
}

export default ContactUs;
