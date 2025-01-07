import React from 'react';
import './landingPage.css'; // Import CSS for styling (we'll create this next)

const LandingPage = () => {
    return (
        <div>
            <header>
                <h1 className="title">Glimpses</h1>
                <p className="subtitle">Where every picture holds a moment</p>
            </header>

            <main>
                <div className="grid-container">
                    <div className="grid-item signup-login">
                        <a href="/register" className="button">SIGN UP</a>
                        <a href="/login" className="button">LOGIN</a>
                    </div>
                    <div className="grid-item about_us">
                        <a href="/about" className="button">MORE ABOUT US</a>
                    </div>
                    <div className="grid-item share">
                        <a href="/register" className="grid_words">SHARE YOUR STORIES!</a>
                    </div>
                    <div className="grid-item memories">
                        <a href="/register" className="grid_words">YOUR MEMORIES AWAIT!</a>
                    </div>
                    <div className="grid-item highlights">
                        <a href="/register" className="grid_words">HIGHLIGHTS</a>
                    </div>
                    <div className="grid-item slice">
                        <a href="/register" className="grid_words">SLICE OF LIFE POSTS</a>
                    </div>
                </div>
            </main>

            <footer>
                {/* You can add footer content here */}
            </footer>
        </div>
    );
}

export default LandingPage;
