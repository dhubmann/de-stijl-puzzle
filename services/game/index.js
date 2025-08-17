const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3002;
const SECRET = process.env.JWT_SECRET;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const colors = ['red', 'blue', 'yellow', 'white'];

const games = {};

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getNextColor(currentColor) {
    const currentIndex = colors.indexOf(currentColor);
    return colors[(currentIndex + 1) % colors.length];
}

function createGrid(gridSize) {
    const grid = [];
    for (let row = 0; row < gridSize; row++) {
        grid[row] = [];
        for (let col = 0; col < gridSize; col++) {
            grid[row][col] = getRandomColor();
        }
    }
    return grid;
}

function getNeighbors(row, col, gridSize) {
    const neighbors = [];
    if (row > 0) neighbors.push([row - 1, col]); // Up
    if (row < gridSize - 1) neighbors.push([row + 1, col]); // Down
    if (col > 0) neighbors.push([row, col - 1]); // Left
    if (col < gridSize - 1) neighbors.push([row, col + 1]); // Right
    return neighbors;
}

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
        req.userId = decoded.id;
        //console.log("Authenticated user ID: ", req.userId);
        next();
    });
}

// Create new grid
app.post('/start', authenticate, (req, res) => {
    const {gridSize} = req.body;
    if (!gridSize || gridSize < 4) return res.status(400).json({ message: 'Invalid grid size' });

    const grid = createGrid(gridSize);
    games[req.userId] = { grid, gridSize };
    //console.log("REQ: ", req.userId);
    res.json({ message: 'Game started', grid });
});

// Rotate cell
app.post('/rotate', authenticate, (req, res) => {
    const { row, col } = req.body;
    const game = games[req.userId];
    if (!game) return res.status(404).json({ message: 'Start a game first' });

    const { grid, gridSize } = game;

    // Rotate selected cell
    grid[row][col] = getNextColor(grid[row][col]);

    // Rotate neighbors
    const neighbors = getNeighbors(row, col, game.gridSize);
    neighbors.forEach(([r, c]) => {
        game.grid[r][c] = getNextColor(game.grid[r][c]);
    });

    res.json({ grid: game.grid });
});

app.listen(PORT, () => {
    console.log(`Game service running on http://localhost:${PORT}`);
});