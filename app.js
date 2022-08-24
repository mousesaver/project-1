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