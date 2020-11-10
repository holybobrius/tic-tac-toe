const container = document.querySelector('.container');

(function setGrid() {
    container.style.gridTemplateColumns = `repeat(${3}, auto)`;
    container.style.gridTemplateRows = `repeat (${3}, auto)`;
    for (let i = 0; i < 3 * 3; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);  
    }
})();


