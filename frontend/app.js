const USER_API = 'http://localhost:3001';
const GAME_API = 'http://localhost:3002';

const gridElement = document.getElementById('grid');
const slider = document.getElementById('gridSizeSlider');
const label = document.getElementById('gridSizeLabel');
const label2 = document.getElementById('gridSizeLabel2');
const startBtn = document.getElementById('startGameBtn');

let gridSize = parseInt(slider.value);
let token = localStorage.getItem('token');

slider.addEventListener('input', () => {
    label.textContent = slider.value;
    label2.textContent = slider.value;
    gridSize = parseInt(slider.value);
});

function renderGrid(grid) {
    gridElement.innerHTML = ''; // clear existing grid
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 0fr)`; // dynamically create columns

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.style.backgroundColor = grid[row][col];
            gridElement.appendChild(cell);
        }
    }
}

async function startGame() {
    const res = await fetch(`${GAME_API}/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ gridSize })
    });

    const data = await res.json();
    renderGrid(data.grid);
}

// Handle cell click
gridElement.addEventListener('click', async (event) => {
    if(!event.target.classList.contains('cell')) return;
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    const res = await fetch(`${GAME_API}/rotate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ row, col })
    });

    const data = await res.json();
    renderGrid(data.grid);
});

startBtn.addEventListener('click', startGame);
startGame(); // Start game on load

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}
