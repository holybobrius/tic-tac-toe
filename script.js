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
        popup.style.display = "block";
    }
    closePopup.onclick = function() {
        popup.style.display = "none";
    }
    window.onclick = function(event) {
        if(event.target == popup) {
            popup.style.display = "none";
        }
    }
    submit.onclick = function() {
        popup.style.display = "none";
        startGame();
    }
})();

const player = (name, mark) => {
    const getName = () => {
        return name;
    }
    const getMark = () => {
        return mark;
    }
    return { getName, getMark }
};

function startGame() {
    const nameInput1 = document.querySelector('#nameInput1');
    const nameInput2 = document.querySelector('#nameInput2');
    const player1 = player(nameInput1.value, 'cross');
    const player2 = player(nameInput2.value, 'circle');
    const cells = document.querySelectorAll('.cell');
    const popup2 = document.querySelector('.popup2');
    const resetButton = document.querySelector('#reset');
    const winnerAnnounce = document.querySelector('.winner-announce');
    const startGameButton = document.querySelector('#start-game');
    let counter = 0;
    let gameWon = false;
    let cellsArray = [];
    cells.forEach(cell => {
        cellsArray.push(cell);
    })
    startGameButton.disabled = true;
    reset();
    counter = 0;
    function makeMove(mark) {
        if(mark == 'cross') {
            let icon = document.createElement('img');
            icon.setAttribute("src", "images/cross.png");
            icon.className = "icon";
            return icon;
        } else if(mark == 'circle') {
            let icon = document.createElement('img');
            icon.setAttribute("src", "images/circle.png");
            icon.className = "icon";
            return icon;
        }
    }

    function checkForWin(mark) {
        if (mark == 'cross') {
            if(
              (cellsArray[0].classList.contains("cross") && cellsArray[1].classList.contains("cross") && cellsArray[2].classList.contains("cross")) ||
              (cellsArray[3].classList.contains("cross") && cellsArray[4].classList.contains("cross") && cellsArray[5].classList.contains("cross")) ||
              (cellsArray[6].classList.contains("cross") && cellsArray[7].classList.contains("cross") && cellsArray[8].classList.contains("cross")) ||
              (cellsArray[0].classList.contains("cross") && cellsArray[3].classList.contains("cross") && cellsArray[6].classList.contains("cross")) ||
              (cellsArray[1].classList.contains("cross") && cellsArray[4].classList.contains("cross") && cellsArray[7].classList.contains("cross")) ||
              (cellsArray[2].classList.contains("cross") && cellsArray[5].classList.contains("cross") && cellsArray[8].classList.contains("cross")) ||
              (cellsArray[0].classList.contains("cross") && cellsArray[4].classList.contains("cross") && cellsArray[8].classList.contains("cross")) ||
              (cellsArray[2].classList.contains("cross") && cellsArray[4].classList.contains("cross") && cellsArray[6].classList.contains("cross"))
            ) {
                announceWinner(player1);
            }
        } else if(mark=='circle') {
            if(
                (cellsArray[0].classList.contains("circle") && cellsArray[1].classList.contains("circle") && cellsArray[2].classList.contains("circle")) ||
                (cellsArray[3].classList.contains("circle") && cellsArray[4].classList.contains("circle") && cellsArray[5].classList.contains("circle")) ||
                (cellsArray[6].classList.contains("circle") && cellsArray[7].classList.contains("circle") && cellsArray[8].classList.contains("circle")) ||
                (cellsArray[0].classList.contains("circle") && cellsArray[3].classList.contains("circle") && cellsArray[6].classList.contains("circle")) ||
                (cellsArray[1].classList.contains("circle") && cellsArray[4].classList.contains("circle") && cellsArray[7].classList.contains("circle")) ||
                (cellsArray[2].classList.contains("circle") && cellsArray[5].classList.contains("circle") && cellsArray[8].classList.contains("circle")) ||
                (cellsArray[0].classList.contains("circle") && cellsArray[4].classList.contains("circle") && cellsArray[8].classList.contains("circle")) ||
                (cellsArray[2].classList.contains("circle") && cellsArray[4].classList.contains("circle") && cellsArray[6].classList.contains("circle"))
            ) {
                announceWinner(player2);
            }
        }
    }

    function announceTie() {
        popup2.style.display = "block";
        winnerAnnounce.innerHTML = "TIE!"
        gameWon = true;
    }

    function announceWinner(player) {
        popup2.style.display = "block";
        winnerAnnounce.innerHTML = player.getName() + " wins!";
        gameWon = true;
    }

    function reset() {
        popup2.style.display = "none";
        cellsArray.forEach(cell => {
            cell.classList.remove("marked");
            cell.classList.remove("cross");
            cell.classList.remove("circle");
            cell.innerHTML = "";
        })
        cellsArray = [];
        cells.forEach(cell => {
            cellsArray.push(cell);
        })
        counter = 0;
        gameWon = false;
        return;
    }
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if(cell.innerHTML == "") {
                if(counter % 2 == 0) {
                    cell.appendChild(makeMove(player1.getMark()));
                    cell.classList.add("cross");
                    checkForWin(player1.getMark());
                } else if (counter % 2 !== 0) {
                    cell.appendChild(makeMove(player2.getMark()));
                    cell.classList.add("circle");
                    checkForWin(player2.getMark());         
                }
                cell.classList.add("marked");
                counter++;
                if(counter == 9 && (gameWon == false)) {
                    announceTie();
                }
            }
        });
    });

    resetButton.onclick = function () {
        reset();
    }
}