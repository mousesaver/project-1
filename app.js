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
    let squareClickable = [ ];
    let playerOne = null;
    let playerTwo = null;
    let stepCount = 0;
    let computerNameLevel = [];


    class player {
        constructor(name) {
            this.name = name;
            this.score = 0;
        }
    }
    let startclickable = true;
    start.addEventListener('click', function(e) {
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
            startclickable = false;
            output.innerText = `${playerOne.name}'s turn!`;
            gameboard = scanGameBoard(category, 8, 8);
        }
        playerOneScore.innerText = `${playerOne.name}'s score: ` + '0';
        playerTwoScore.innerText = `${playerTwo.name}'s score: ` + '0';
        
    })