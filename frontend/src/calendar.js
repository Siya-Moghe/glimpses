import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './calendar.css';
import './menu.css';
import Header from './header';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");
    if (userEmail) {
      setEmail(userEmail);
    }
    console.log("Current email from session:", userEmail); // Debug log
  }, []);

  const generateCalendar = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handleDateClick = async (day) => {
    if (day) {
      const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(selected);
      
      setImages([]);
      setLoading(true);
      setError(null);

      if (!email) {
        setError('Email is missing');
        setLoading(false);
        return;
      }

      const dateString = selected.toISOString().split('T')[0];
      console.log("Attempting to fetch images for:", dateString, "email:", email); // Debug log

      try {
        let response;
        
          response = await axios.get(`http://localhost:3001/images/${dateString}`, {
            params: { email }
          });      

        console.log("API Response:", response.data); // Debug log

        if (response.data) {
          setImages(response.data);
        }
      } catch (err) {
        console.error('Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          url: err.config?.url,
          params: err.config?.params
        });
        setError(`Error loading images: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const days = generateCalendar(currentDate);

  return (
    <div>
      <Header />
      <div>
        <main>
          <div className="calendar-container">
            <div className="calendar-header">
              <button
                className="prev-month"
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
              >
                &lt;
              </button>
              <h2 id="monthYear">
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
              </h2>
              <button
                className="next-month"
                onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
              >
                &gt;
              </button>
            </div>

            <div className="calendar-grid">
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`${day ? 'day' : 'empty'} ${selectedDate?.getDate() === day ? 'selected' : ''}`}
                  onClick={() => handleDateClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div className="images-container">
              <h3>Images on {selectedDate.toDateString()}</h3>
              {loading && <p>Loading images...</p>}
              {error && <p className="error">{error}</p>}
              {images.length === 0 && !loading && !error && <p>No images found.</p>}
              <div className="images-grid">
                {images.map((image, index) => (
                  <div key={index} className="image-item">
                    <img 
                      src={`http://localhost:3001${image.src}`} 
                      alt={`Uploaded on ${selectedDate.toDateString()}`}
                      onError={(e) => {
                        console.error('Image load error:', image.src);
                        e.target.src = 'placeholder.jpg'; // Optional: provide a placeholder
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;