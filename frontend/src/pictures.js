import React, { useState, useEffect } from 'react';
import './pictures.css'; // Assuming your CSS file is the same
import './menu.css'; // Assuming your CSS file for the menu is the same
import axios from 'axios';
import Header from './header';

function Polaroid({ image, caption, onClick, onUpload }) {
    return (
        <div className="polaroid">
            <img src={image} alt={caption} onClick={onClick} />
            <div className="caption">{caption}</div>
        </div>
    );
}

function PictureGallery() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);  // Track file selection

    // Fetch images from the server on component mount
    useEffect(() => {
        axios.get('http://localhost:3001/pictures')
            .then((res) => {
                setImages(res.data);  // Set images fetched from the backend
            })
            .catch((err) => {
                console.log("Error fetching images:", err);
            });
    }, []);

    
    const openImage = (image) => {
        setSelectedImage(image);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // Store selected file
        }
    };

    const handleUpload = () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:3001/upload', formData)
            .then(res => {
                console.log('Upload response:', res);
                // Add new uploaded image to the list
                const updatedImages = [...images, { src: res.data.filePath, caption: 'New Image' }];
                setImages(updatedImages);  // Update the image list
                setFile(null);  // Clear the file input after successful upload
            })
            .catch(err => {
                console.error('Error uploading image:', err);
                alert('Error uploading image');
            });
    };

    return (
        <div>
            <Header />

            <div className="album">
                {images.length === 0 ? (
                    <p>No images found. Please upload some images.</p>
                ) : (
                    images.map((image, index) => (
                        <Polaroid
                            key={index}
                            image={`http://localhost:3001${image.src}`} // Ensure the correct image path
                            caption={image.caption}
                            onClick={() => openImage(image.src)}
                            onUpload={handleUpload}
                        />
                    ))
                )}
            </div>

            {selectedImage && (
                <div className="lightbox" onClick={closeImage}>
                    <img src={selectedImage} alt="Selected" className="lightbox-image" />
                    <button className="close-btn" onClick={closeImage}>&times;</button>
                </div>
            )}

            {/* Upload Button (Plus Symbol) */}
            <div className="upload-container">
                <input 
                    type="file"
                    id="file-input"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <button
                    className="upload-btn"
                    onClick={() => document.getElementById('file-input').click()} // Open file input dialog
                >
                    +
                </button>
                {file && (
                    <div>
                        <p>{file.name}</p>
                        <button onClick={handleUpload}>Upload Image</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PictureGallery;
