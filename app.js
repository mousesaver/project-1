document.addEventListener('DOMContentLoaded', () => {

    const emojiAnimal = ['🐶', '🐱', '🐧', '🐵', '🦊', '🐙'];
    const emojiFood = ['🍇', '🍕', '🎂', '🥟', '🍣', '🥗'];
    const emojiCollection = [emojiAnimal, emojiFood];
    let category = document.querySelector('#category').value;
    const playerOneName = document.querySelector('#playerOneName');
    const playerTwoName = document.querySelector('#playerTwoName');
    const start = document.querySelector('#start');
    const reset = document.querySelector('#reset');
    const scoreBoard = document.querySelector('.scoreboard');
    let squares = document.querySelectorAll('.square');
    const output = document.querySelector('#thirdrow');
    let playerOneTurn = true;
    let squareClickable = [];
    let squareClickableCopy =[];
    let playerOne = null;
    let playerTwo = null;
    let stepCount = 0;
    let computerNameLevel = [];
    let gameboard = null;

    class player {
        constructor(name) {
            this.name = name;
            this.score = 0;
        }
    }
    gameboardInit(8, 8)
    let startclickable = false;
    start.addEventListener('click', function(e) {
        if (playerOneName.value !== "" && playerTwoName.value !== "") {
            startclickable = true;
        }
        if (startclickable) {
            category = document.querySelector('#category').value;
            playerOne = new player(playerOneName.value);
            computerNameLevel = playerTwoName.value.split(" ");
            playerTwo = new player(computerNameLevel[0]);
            const playerOneScore = document.createElement('div');
            playerOneScore.classList.add('score');
            scoreBoard.append(playerOneScore);
            const playerTwoScore = document.createElement('div');
            playerTwoScore.classList.add('score');
            scoreBoard.append(playerTwoScore);
            gameboardInit(8, 8);
            clickable(8, 8);
            output.innerText = `${playerOne.name}'s turn!`;
            gameboard = scanGameBoard(category, 8, 8);
        }
        if (startclickable) {
            playerOneScore.innerText = `${playerOne.name}: 0`;
            playerTwoScore.innerText = `${playerTwo.name}: 0`; 
            playerOneName.value = '';
            playerTwoName.value = '';
            startclickable = false;
        }
          
    })

    reset.addEventListener('click', function(e) {
        playerOneTurn = true;
        squareClickable = [ ];
        playerOne = null;
        playerTwo = null;
        stepCount = 0;
        gameboardInit(8, 8)
        startclickable = true;
        playerOneScore.innerText = ' ';
        playerTwoScore.innerText = ' ';
        output.innerText = 'Follow instruction and start the game!'
        playerOneName.value = '';
        playerTwoName.value = '';
        playerOneScore.style.backgroundColor = 'white'
        playerTwoScore.style.backgroundColor = 'white'
    })

    function scanGameBoard(category, row, column) {
        let gameBoard = [];
        let index = 0;
        squares = document.querySelectorAll('.square');
        while (index < column * row) {
            if (category === 'Dog' && squares[index].innerText === '🐶') {
                gameBoard.push(1);
            } else if (category === 'Cat' && squares[index].innerText === '🐱') {
                gameBoard.push(1);
            } else if (category === 'Bird' && squares[index].innerText === '🐧') {
                gameBoard.push(1);
            } else if (category === 'Monkey' && squares[index].innerText === '🐵') {
                gameBoard.push(1);
            } else if (category === 'Cake' && squares[index].innerText === '🎂') {
                gameBoard.push(1);
            } else {
                gameBoard.push(0);
            }
            index++;
        }
        return gameBoard;
    }

    function computerPlay(row, column, level) {
        let index = Math.floor(Math.random() * (row * column));
        if ((level === '1' && Math.random() < 0.02) || (level === '2' && Math.random() < 0.04) || 
        (level === '3' && Math.random() < 0.06) || (level === '4' && Math.random() < 0.08) ||
        (level === '5' && Math.random() < 0.1)) {
            while (!squareClickable[index] || gameboard[index] !== 1) {
                if (!squareClickable[index]) {
                    gameboard[index] = 0;
                }
                index = gameboard.indexOf(1)
                if (index === -1) {
                    while (!squareClickable[index]) {
                        index = Math.floor(Math.random() * (row * column));
                    }
                    break;
                }
            } 
        } else {
            while (!squareClickable[index]) {
                index = Math.floor(Math.random() * (row * column));
            }

        }
        squareClickableCopy = squareClickable;
        squareClickable = [];
        setTimeout(function() {
            squareClickable = squareClickableCopy;
            squares = document.querySelectorAll('.square');
            squares[index].style.fontSize = '3vw';
            squares[index].style.backgroundColor = 'green';
            score(category, squares[index].innerText, playerTwo);
            playerTwoScore.innerText = `${playerTwo.name}: ${playerTwo.score}`;
            output.innerText = `${playerOne.name}'s turn!`;
            playerOneTurn = !playerOneTurn;
            squareClickable[index] = false;
            stepCount++;
            if (stepCount === column * row) {
                gameOver();
            }
        }, 1000);   
    }

    function emojiSelector() {
        let i = Math.floor(Math.random() * emojiCollection.length);
        let j = Math.floor(Math.random() * emojiCollection[i].length)
        return emojiCollection[i][j];

    }

    function clickable(row, column) {
        for (let i = 0; i < row * column; i++) {
            squareClickable.push(true);
        }
    }

    function score(category, emoji, player) {
        if (category === 'Dog' && emoji === '🐶') {
            player.score += 1;
        } else if (category === 'Cat' && emoji === '🐱') {
            player.score += 1;
        } else if (category === 'Bird' && emoji === '🐧') {
            player.score += 1;
        } else if (category === 'Monkey' && emoji === '🐵') {
            player.score += 1;
        } else if (category === 'Cake' && emoji === '🎂') {
            player.score += 1;
        } else {
            console.log('no point')
        }
    }

    function gameOver() {
        if (playerOne.score > playerTwo.score) {
            output.innerText = `Game Over! Congratulation to ${playerOne.name}!`;
            playerOneScore.style.backgroundColor = 'red'
        } else if (playerOne.score < playerTwo.score) {
            output.innerText = `Game Over! Congratulation to ${playerTwo.name}!`;
            playerTwoScore.style.backgroundColor = 'red'
        } else {
            output.innerText = `Game Over! It's a draw!`;
        }
    }

    function gameboardInit(row, column) {
        const gameboard = document.querySelector('#gameboard');
        while(gameboard.firstChild) {
            gameboard.removeChild(gameboard.firstChild);
        }
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                const div = document.createElement('div');
                div.innerText = emojiSelector();
                div.classList.add('square');
                div.addEventListener('click', function(e) {
                    if (squareClickable[i * column + j] === true) {
                        e.target.style.fontSize = '3vw';
                        if (playerOneTurn) {
                            e.target.style.backgroundColor = 'blue';
                            score(category, e.target.innerText, playerOne)
                            playerOneScore.innerText = `${playerOne.name}: ${playerOne.score}`;
                            playerTwoScore.innerText = `${playerTwo.name}: ${playerTwo.score}`;
                            output.innerText = `${playerTwo.name}'s turn!`
                        } else {
                            e.target.style.backgroundColor = 'green';
                            score(category, e.target.innerText, playerTwo)
                            playerTwoScore.innerText = `${playerTwo.name}: ${playerTwo.score}`;
                            output.innerText = `${playerOne.name}'s turn!`
                        }
                        playerOneTurn = !playerOneTurn;
                        squareClickable[i * column + j] = false;
                        stepCount++;
                        if (stepCount === column * row) {
                            gameOver();
                        }
                        if (playerTwo.name === 'Computer') {
                            computerPlay(row, column, computerNameLevel[1]);
                        } 
                    }   
                })
                gameboard.append(div);
            }
        }
    }
})