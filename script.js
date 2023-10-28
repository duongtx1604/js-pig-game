'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');
const btnNewEl = document.querySelector('.btn--new');

// set default
const totalScores = [0, 0];
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEl.classList.add('hidden');
let active = 0,
  currentScore = 0;

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
  document.getElementById(`score--${active}`).textContent =
    totalScores[activePlayer];
};

// random dice function
let randomDice = function (activePlayer) {
  let roll = Math.trunc(Math.random() * 6) + 1;
  console.log(roll);
  //   update dice
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
  randomDice(active);
});

// btn hold click
btnHoldEl.addEventListener('click', function () {
  updateScore(active);
  changePlayer();
});

// btn new click
btnNewEl.addEventListener('click', function () {
  totalScores[0] = 0;
  totalScores[1] = 0;
  changePlayer();
  currentScore = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
});
