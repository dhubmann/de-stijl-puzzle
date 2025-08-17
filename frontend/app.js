const gridElement = document.getElementById('grid');
const slider = document.getElementById('gridSizeSlider');
const label = document.getElementById('gridSizeLabel');
const label2 = document.getElementById('gridSizeLabel2');
const startBtn = document.getElementById('startGameBtn');

let gridSize = parseInt(slider.value);

slider.addEventListener('input', () => {
    label.textContent = slider.value;
    label2.textContent = slider.value;
    gridSize = parseInt(slider.value);
});

startBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    console.log("TOKEN: ", token);
    if (!token) {
        alert('You must be logged in to start a game.');
        return;
    }
    await startGame();
});

async function startGame() {
    const token = localStorage.getItem('token');

    const res = await fetch(`${CONFIG.GAME_API}/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ gridSize })
    });

    const data = await res.json();

    if (res.ok) {
        renderGrid(data.grid);
        console.log("GRID SIZE: ", gridSize);
        console.log("GRID: ", data.grid);
    } else {
        alert(data.message);
    }
} 

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

// Handle cell click
gridElement.addEventListener('click', async (event) => {
    if(!event.target.classList.contains('cell')) return;
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const token = localStorage.getItem('token');

    const res = await fetch(`${CONFIG.GAME_API}/rotate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ row, col })
    });

    const data = await res.json();
    renderGrid(data.grid);
});

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}
