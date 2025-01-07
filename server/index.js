const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require('./models/user');
const multer = require('multer');
const path = require('path');
const Image = require('./models/images');

const app = express();
app.use(express.json());
app.use(cors());

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure this directory exists: public/images
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        // Add a timestamp to prevent file name collisions
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

mongoose.connect("mongodb://localhost:27017/glimpses", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error:', err));

// POST route for login
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Password is incorrect");
                }
            } else {
                res.json("User not found");
            }
        });
});

// POST route to upload an image and save to MongoDB
/*
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = `/images/${req.file.filename}`;
    const caption = req.body.caption || 'No caption';  // Default caption if none provided
    const email = req.body.email || 'Anonymous';  // Default to 'Anonymous' if no email is provided

    // Log the email and other fields to check if they are correctly received
    console.log('Received email:', email);
    console.log('Received caption:', caption);

    const newImage = new Image({
        src: filePath,
        caption: caption,
        email: email,
    });

    newImage.save()
        .then(savedImage => {
            res.json(savedImage);  // Respond with the saved image details
        })
        .catch((err) => {
            console.error('Error saving image:', err);
            res.status(500).json({ error: 'Error saving image to database' });
        });
});
*/

// POST route to upload an image and save to MongoDB
app.post('/upload', upload.single('file'), (req, res) => {
    console.log('Request body:', req.body);  // Log the entire request body

    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = `/images/${req.file.filename}`;
    const caption = req.body.caption || 'No caption';  // Default caption if not provided

    const email = req.body.email || 'Anonymous';  // Default to 'Anonymous' if no email is provided

    // Log the email and caption2 to ensure they are received
    console.log('Received email:', email);  
    console.log('Received caption:', caption);

    const newImage = new Image({
        src: filePath,
        caption: caption,

        email: email,
    });

    newImage.save()
        .then(savedImage => {
            res.json(savedImage);
        })
        .catch((err) => {
            console.error('Error saving image:', err);
            res.status(500).json({ error: 'Error saving image to database' });
        });
});



// Route to get images for a specific date and email
app.get('/images', (req, res) => {
    const { date, email } = req.query;
  
    if (!email || !date) {
      return res.status(400).json({ error: 'Email and date are required' });
    }
  
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
  
    Image.find({
      email: email,
      uploadDate: { $gte: startOfDay, $lt: endOfDay }
    })
      .then(images => {
        if (images.length === 0) {
          return res.status(404).json({ error: 'No images found for this date' });
        }
        res.json(images);
      })
      .catch((err) => {
        console.error('Error fetching images:', err);
        res.status(500).json({ error: 'Error fetching images' });
      });
  });
  





//app.use('/images', express.static(path.join(__dirname, 'public/images')));

// GET route to fetch all images from MongoDB
// GET route to fetch images based on the logged-in user's email
app.get('/pictures', (req, res) => {
    const email = req.query.email;  // Get email from the query string

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    Image.find({ email: email })  // Fetch images for the specific user
        .then(images => {
            res.json(images);
        })
        .catch((err) => {
            console.error('Error fetching images:', err);
            res.status(500).json({ error: 'Error fetching images' });
        });
});


// Serve static files (images) from the 'public/images' folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Your existing POST route for user registration
app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

// Start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
