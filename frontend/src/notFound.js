import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css'; // You can style the page by creating this CSS file

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you're looking for does not exist or has been moved.</p>
        <Link to="/" className="back-home-button">Go Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
