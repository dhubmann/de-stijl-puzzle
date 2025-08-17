const gridElement = document.getElementById('grid');
const slider = document.getElementById('gridSizeSlider');
const label = document.getElementById('gridSizeLabel');
const label2 = document.getElementById('gridSizeLabel2');
const startBtn = document.getElementById('startGameBtn');
let gridSize = parseInt(slider.value);

const colors = ['red', 'blue', 'yellow', 'white'];

slider.addEventListener('input', () => {
    label.textContent = slider.value;
    label2.textContent = slider.value;
});

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getNextColor(currentColor) {
    const currentIndex = colors.indexOf(currentColor);
    return colors[(currentIndex + 1) % colors.length];
}

function rotateCell(cell) {
    const currentColor = cell.style.backgroundColor;
    cell.style.backgroundColor = getNextColor(currentColor);
}

function getNeighbors(cell, gridSize) {
    const neighbors = [];
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    if (row > 0) neighbors.push(document.querySelector(`.cell[data-row='${row-1}'][data-col='${col}']`));
    if (row < gridSize - 1) neighbors.push(document.querySelector(`.cell[data-row='${row+1}'][data-col='${col}']`));
    if (col > 0) neighbors.push(document.querySelector(`.cell[data-row='${row}'][data-col='${col-1}']`));
    if (col < gridSize - 1) neighbors.push(document.querySelector(`.cell[data-row='${row}'][data-col='${col+1}']`));
    
    return neighbors;
}

function createGrid(gridSize) {
    gridElement.innerHTML = ''; // clear existing grid
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 0fr)`; // dynamically create columns

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.style.backgroundColor = getRandomColor();
            gridElement.appendChild(cell);
        }
    }
}

// Handle cell click
gridElement.addEventListener('click', (event) => {
    if(!event.target.classList.contains('cell')) return;

    //gridSize = parseInt(slider.value);
    if (event.target.classList.contains('cell')) {
        const cell = event.target;
        rotateCell(cell);
        const neighbors = getNeighbors(cell, gridSize);
        neighbors.forEach(neighbor => rotateCell(neighbor));
    }
});

startBtn.addEventListener('click', () => {
    createGrid(parseInt(slider.value));
});

createGrid(parseInt(slider.value));

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

if(!localStorage.getItem('token')) {
    window.location.href = 'login.html';
}