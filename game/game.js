
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const time = document.querySelector('.displayTimeLeft');
const endTime = document.querySelector('.displayEndTime')
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log("That's the same one bud");
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(500, 1200);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => {
    timeUp = true;
  }, 60000);
  timer(60);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));


let countdown;
function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    // const adjustedTime = { 00: 00 };
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // stop the timer if it is less than 0
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display the time
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  time.style = `"height: 11rem;
                width: 20rem;
                border: 4px solid black;
                margin: 0.4em 6em;
                font-size: 6em"`

  if (remainderSeconds === 0) {
    time.textContent = "Game Over!!"
  } else {
    time.textContent = display;
  }
}