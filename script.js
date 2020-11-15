(function setGameboard() {
    const container = document.querySelector('.container');
    const popup = document.querySelector('.popup');
    const startGameButton = document.querySelector('#start-game');
    const closePopup = document.querySelector('.close');
    const submit = document.querySelector('.submit');
    container.style.gridTemplateColumns = `repeat(${3}, minmax(0, 1fr))`;
    container.style.gridTemplateRows = `repeat (${3}, minmax(0, 1fr))`;
    for (let i = 0; i < 3 * 3; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
    }
    startGameButton.onclick = function() {
        console.log('test');
        popup.style.display = "block";
    }
    closePopup.onclick = function() {
        console.log('test2');
        popup.style.display = "none";
    }
    window.onclick = function(event) {
        if(event.target == popup) {
            popup.style.display = "none";
        }
    }
    submit.onclick = function() {
        console.log('submit');
        popup.style.display = "none";
        startGame();
    }
    
})();

function startGame() {
    const cells = document.querySelectorAll('.cell');
    let counter = 0;
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if(counter % 2 == 0 && cell.innerHTML == "") {
                let icon = document.createElement('img');
                icon.setAttribute("src", "images/cross.png");
                icon.className = "icon";
                cell.appendChild(icon);
            } else if (counter % 2 !== 0 && cell.innerHTML=="") {
                let icon = document.createElement('img');
                icon.setAttribute("src", "images/circle.png");
                icon.className = "icon";
                cell.appendChild(icon);
                console.log(counter);
            }
            counter++;
        });
    });
}