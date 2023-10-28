'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const btnNewEl = document.querySelector('.btn--new');

let totalScores, currentScore, active, playing;

// set default
const init = function () {
  totalScores = [0, 0];
  currentScore = 0;
  active = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init();

// find Winner
const findWinner = function (activePlayer) {
  // 1. Check if player's score is >= 100
  if (totalScores[activePlayer] >= 100) {
    //finish the game
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  }
};

// change player function
const changePlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${active}`).textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  active = active === 0 ? 1 : 0;
};

// update current to score function
const updateScore = function (activePlayer) {
  totalScores[activePlayer] += currentScore;
  // scores[1] = scores[1] + currentScore
  document.getElementById(`score--${active}`).textContent =
    totalScores[activePlayer];
};

// random dice function
let randomDice = function (activePlayer) {
  // 1. Generating a random dice roll
  let roll = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.src = `dice-${roll}.png`;
  if (diceEl.classList.contains('hidden')) {
    diceEl.classList.remove('hidden');
  }

  //   reset dice
  if (roll !== 1) {
    currentScore += roll;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    changePlayer();
  }
};

// btn roll click
btnRollEl.addEventListener('click', function () {
  if (playing) {
    randomDice(active);
  }
});

// btn hold click
btnHoldEl.addEventListener('click', function () {
  if (playing) {
    updateScore(active);
    findWinner(active);
    // Switch to next player
    changePlayer();
  }
});

// btn new click
btnNewEl.addEventListener('click', init);
