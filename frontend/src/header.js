import React, { useState } from 'react';
import menuIcon from './menu-icon.png';
import profileIcon from './profile-icon.png';
import { Link } from 'react-router-dom';
import './header.css';
import { useNavigate } from 'react-router-dom';


function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navigate = useNavigate(); 

    const handleLogout = () => {
        // Clear the session storage and log out
        sessionStorage.removeItem("userEmail");
        window.location.href = '/';  
    };

    const isLoggedIn = sessionStorage.getItem("userEmail"); 

    return (
        <header className="header">
            <button 
                className="menu-toggle" 
                onClick={toggleMenu}
                aria-label="Toggle Menu"
            >
                <img src={menuIcon} alt="Menu" className="menu-icon" />
            </button>
            <h1 className="title">glimpses</h1>

            <div className="profile-icon" >
                <img src={profileIcon} alt="Profile" />
            </div>


            {/* Sidebar Menu */}
            <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <button 
                    className="close-menu" 
                    onClick={closeMenu}
                    aria-label="Close Menu"
                >
                    &times;
                </button>
                <ul>
                    {/* Only show these links if the user is logged in */}
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/home" onClick={closeMenu}>Home</Link></li>
                            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                            <li><Link to="/calendar" onClick={closeMenu}>Calendar</Link></li>
                            <li><Link to="/faq" onClick={closeMenu}>FAQ</Link></li>
                            <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
                        </>
                    ) : (
                        <li>
                            <button
                                onClick={() => navigate('/login')}  // Redirect to login if not logged in
                                className="sidebar-login-redirect"
                            >
                                Log in to access
                            </button>
                        </li>
                    )}
                </ul>
                
                {/* Add Log Out Button in Sidebar */}
                {isLoggedIn && (
                    <button onClick={handleLogout} className="sidebar-logout">Log Out</button>
                )}
            </div>

            

            {/* Overlay to close menu when clicking outside */}
            {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
        </header>
    );
}

export default Header;
