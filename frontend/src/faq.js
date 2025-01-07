import React from 'react';
import './faq.css';  // You can style the FAQ page with this CSS file
import Header from './header.js'

const FAQ = () => {
  return (
    <div className="faq-container">
        <Header/>
      <h3 style={{color:'#380412'}}>Frequently Asked Questions</h3>

      <div className="faq-item">
        <h3>How do I upload an image to the gallery?</h3>
        <p>
          To upload an image, follow these steps <br/> 1. Type in your email and desired caption <br/> 
          2. Click on <strong>Choose File</strong> and upload your file <br/>
          3. Finally click on <strong>Upload</strong><br/>
          Your image will appear in the gallery once updated!
        </p>
      </div>

      <div className="faq-item">
        <h3>Do I need to create an account to upload images??</h3>
        <p>
          Yes you are required to register with your name and email.
        </p>
      </div>

      <div className="faq-item">
        <h3>How do I log out of the app?</h3>
        <p>
          To log out, click on the <strong>Menu Icon</strong> in the top-left corner, and a sidebar will appear with the option to <strong>Log Out</strong>.<br/>
          Once you log out, you will be redirected to the homepage.
        </p>
      </div>

      <div className="faq-item">
        <h3>How many images can I upload to an album?</h3>
        <p>
          Each album allows you to upload <strong>UNLIMITED</strong> images.
        </p>
      </div>

      <div className="faq-item">
        <h3>8. How can I contact support?</h3>
        <p>
          If you need help or have any questions, you can contact us via the <strong>"Contact Us"</strong> page or email us directly at support@glimpses.com.
        </p>
      </div>
      
    </div>
  );
};

export default FAQ;
