const gridSize = 7;
const gridElement = document.getElementById('grid');

for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.style.backgroundColor = 'red'; // initial color
        gridElement.appendChild(cell);
    }
}