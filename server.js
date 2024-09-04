const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Define upload directory

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema and model for Player
const playerSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    second_name: { type: String, required: true },
    role: String,
    email: { type: String, required: true, match: /.+@.+\..+/ }, // Basic email validation
    phone: { type: String, match: /^\d{10}$/ }, // Validate phone number to be exactly 10 digits
    dob: { type: Date, required: true },
    matches: { type: Number, required: true },
    address: { type: String, required: true },
    marital_status: { type: String, required: true },
    jersey_size: { type: String },
    medical_conditions: { type: String },
    allergies: { type: String },
    medications: { type: String },
    proof_of_identity: { type: String } // Store file path or URL
});

const Player = mongoose.model('Player', playerSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'guda.html'));
});

app.get('/chennai', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'chennai.html'));
});

app.get('/gujarat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gujarat.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'));
});

// Handle form submission
app.post('/register', upload.single('proof_of_identity'), async (req, res) => {
    try {
        // Log the incoming data for debugging
        console.log('Received data:', req.body);
        console.log('File info:', req.file);

        // Handle file upload
        const proofOfIdentity = req.file ? req.file.path : '';

        // Create a new player instance with the received data
        const playerData = {
            ...req.body,
            proof_of_identity: proofOfIdentity // Save file path
        };

        // Create a new Player instance
        const newPlayer = new Player(playerData);

        // Save the new player to the database
        await newPlayer.save();

        // Log success message
        console.log('Player saved successfully:', newPlayer);

        // Redirect to a confirmation or home page
        res.redirect('/');
    } catch (error) {
        console.error('Error saving player:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
 
 