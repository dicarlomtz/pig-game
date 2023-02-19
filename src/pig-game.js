'use strict';

import { elementSelector, addEventListener } from "./utils/dom.js";
import { deepCopy } from "./utils/objects.js";

const DEFAULT_WINNER_SCORE = 100;

const PLAYER_LABELS = {
    playerOne: "playerOne",
    playerTwo: "playerTwo",
}

const GAME_DATA_DEFAULT_VALUES = {
  playerOne: { score: 0, currentScore: 0 },
  playerTwo: { score: 0, currentScore: 0 },
  currentPlayer: PLAYER_LABELS.playerOne,
  playing: true,
};

const gameData = deepCopy(GAME_DATA_DEFAULT_VALUES);

// elements
const player1 = elementSelector('.player--0');
const player2 = elementSelector('.player--1');
const player1Score = elementSelector('#score--0');
const player2Score = elementSelector('#score--1');
const player1CurrentScore = elementSelector('#current--0');
const player2CurrentScore = elementSelector('#current--1');
const newGameBtn = elementSelector('.btn--new');
const rollBtn = elementSelector('.btn--roll');
const holdBtn = elementSelector('.btn--hold');
const diceImg = elementSelector('.dice');


// initilizers
player1Score.textContent = 0;
player2Score.textContent = 0;
diceImg.classList.add('hidden');

const updateUIWithGameData = () => {
    player1Score.textContent = gameData.playerOne.score;
    player2Score.textContent = gameData.playerTwo.score;
    player1CurrentScore.textContent = gameData.playerOne.currentScore;
    player2CurrentScore.textContent = gameData.playerTwo.currentScore;
};

// Rolling dice

const switchToNextPlayer = () => {
    const { currentPlayer } = gameData;

    const newPlayer = Object.keys(PLAYER_LABELS).find(key => PLAYER_LABELS[key] !== currentPlayer);

    gameData.currentPlayer = PLAYER_LABELS[newPlayer];
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
};

// Resets the state to start a new game
const newGameEventHandler = () => {
    const newData = deepCopy(GAME_DATA_DEFAULT_VALUES);
    Object.keys(gameData).forEach(key => gameData[key] = newData[key]);
    diceImg.classList.add('hidden');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    updateUIWithGameData();
}

// if player has a good move, add current score to his current score
const addDiceResultToCurrentScore = (diceNumber) => {
    const { currentPlayer } = gameData;

    gameData[currentPlayer].currentScore += diceNumber;
};

// removes the score if player has lost, then switches to next player
const removePlayerScore = () => {
    const { currentPlayer } = gameData;

    gameData[currentPlayer].currentScore = 0;
    gameData[currentPlayer].score = 0;

    switchToNextPlayer();
}

// if player decices to hold, add current score to his global score
const holdCurrentScore = () => {
    if (!gameData.playing) return;

    const { currentPlayer } = gameData;

    gameData[currentPlayer].score += gameData[currentPlayer].currentScore;
    gameData[currentPlayer].currentScore = 0;

    updateUIWithGameData();

    if (gameData[gameData.currentPlayer].score >= DEFAULT_WINNER_SCORE) {
        stopGameOnWinner();
        return;
    }

    switchToNextPlayer();
}

const stopGameOnWinner = () => {
    const { currentPlayer } = gameData;

    gameData.playing = false;

    switch(currentPlayer) {
        case PLAYER_LABELS.playerOne:
            player1.classList.add('player--winner');
            break;
        case PLAYER_LABELS.playerTwo:
            player2.classList.add('player--winner');
            break;
    }
}

// if dice is 1, then player will loss his score
const diceResultHandler = (diceNumber) => {
    diceNumber !== 1
        ? addDiceResultToCurrentScore(diceNumber)
        : removePlayerScore();
};

const rollDiceEventHandler = () => {
    if (!gameData.playing) return;

    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    diceImg.classList.remove('hidden');
    diceImg.src = `/public/img/dice-${diceNumber}.png`;

    diceResultHandler(diceNumber);
    updateUIWithGameData();
};

addEventListener(rollBtn, 'click', rollDiceEventHandler);
addEventListener(newGameBtn, 'click', newGameEventHandler);
addEventListener(holdBtn, 'click', holdCurrentScore);
