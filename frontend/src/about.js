import React, { useState } from 'react';
import './AboutUs.css';  // Your CSS file for About Us page
import './menu.css';     // Your CSS file for the menu styling
import menuIcon from './menu-icon.png'; // Assuming image paths are correct
import profileIcon from './profile-icon.png';
import Header from './header';

const AboutUs = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div>
            <Header/>

            <div className="outer-container">
                <div className="middle-container">
                    <h2>About Us</h2>

                    <p>
                        At Glimpses, we believe that moments are meant to be cherished, not forgotten. 
                        Our platform lets you easily capture and curate your most memorable moments into 
                        beautifully crafted photo albums. With each album allowing up to 9 images, Glimpses
                        helps you focus on the highlights, keeping your memories both intimate and meaningful.
                    </p>
                    
                    <br />

                    <p>
                        Whether you're sharing a special event, a day out with friends, or your creative photography, 
                        Glimpses makes it easy to create albums that tell a story. Designed for simplicity and style, 
                        we aim to provide a space where your visual experiences can be shared, remembered, and celebrated. 
                    </p>

                    <br />

                    <p>
                        Start creating your own albums today with Glimpses — where every picture holds a moment, and every 
                        moment becomes a story.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
