import React, { useEffect, useState } from 'react';
import albumImage from './album.png';
import './albums.css';
import axios from 'axios';
import Header from './header';

function Home() {
    const [file, setFile] = useState();
    const [email, setEmail] = useState("");  // State for email
    const [caption, setCaption] = useState("");  // State for caption

    const [images, setImages] = useState([]);
    const storedEmail = sessionStorage.getItem("userEmail");

    useEffect(() => {
        // Fetch images specific to the logged-in user's email
        if (storedEmail) {
            axios.get(`http://localhost:3001/pictures?email=${storedEmail}`)
                .then(res => setImages(res.data))
                .catch(err => console.log(err));
        }
    }, [storedEmail]);  // Fetch images when email state changes

    const handleUpload = (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('file', file);  // Add the file to the FormData
        formdata.append('caption', caption);  // Add the first caption to the FormData

        formdata.append('email', email);  // Add email to the FormData

        // Check if email is set, otherwise log an error
        if (!email) {
            console.error('No email provided');
            return;
        }

        console.log('Email:', email);
        console.log('Caption:', caption);

        // Send the email and file as part of the request
        axios.post('http://localhost:3001/upload', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: { email }
        })
        .then(res => {
            console.log("Image uploaded successfully:", res.data);
            setImages(prevImages => [...prevImages, res.data]);  // Update state with new image
        })
        .catch(err => {
            console.error("Error uploading image:", err);
        });
    };

    return (
        <div style={{ backgroundColor: '#ecebe5' }}>
            <Header />
            <div className="album-container">
                {images.map((image) => (
                    <div key={image._id} className="album-card">
                        <img src={`http://localhost:3001${image.src}`} alt={image.caption} />
                        <h3>{image.caption}</h3>
                    </div>
                ))}

                <div className="album-card">
                    <input 
                        type="text" 
                        value={caption} 
                        onChange={(e) => setCaption(e.target.value)} 
                        placeholder="Add a caption" 
                    />

               

                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Enter your email"
                    />
                    <input type="file" onChange={e => setFile(e.target.files[0])} />  
                    <button onClick={handleUpload}>Upload</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
