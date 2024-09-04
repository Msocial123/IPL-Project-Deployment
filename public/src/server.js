const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory store
let players = [];

// Endpoint to get all players
app.get('/players', (req, res) => {
    res.json(players);
});

// Endpoint to add a player
app.post('/players', (req, res) => {
    const { name, leagues, score, dob } = req.body;
    if (name && leagues && score && dob) {
        players.push({ name, leagues, score, dob });
        res.status(201).json({ message: 'Player added successfully!' });
    } else {
        res.status(400).json({ message: 'Invalid data!' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

