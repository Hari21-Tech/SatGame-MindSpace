const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over");
const stringDisplay = document.getElementById("stringDisplay");
const countdownEl = document.getElementById("countdown");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submitBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const finalScoreEl = document.getElementById("finalScore");

let round = 1;
let score = 0;
let currentString = "";
let previousStrings = [];

// Only lowercase letters + numbers
function generateRandomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result;
  do {
    result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (previousStrings.includes(result));
  previousStrings.push(result);
  if (previousStrings.length > 10) previousStrings.shift();
  return result;
}

function startGame() {
  startScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  round = 1;
  score = 0;
  scoreDisplay.textContent = "";
  nextRound();
}

// Function to reset everything and go back to Start Screen
function goToStartScreen() {
  gameScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  scoreDisplay.textContent = "";
  userInput.value = "";
  countdownEl.textContent = "";
  stringDisplay.textContent = "";
  round = 1;
  score = 0;
  previousStrings = [];
}

function nextRound() {
  userInput.classList.add("hidden");
  submitBtn.classList.add("hidden");
  countdownEl.textContent = "";

  const length = 3 + round - 1; // Start with 3 characters, increase each round
  currentString = generateRandomString(length);
  stringDisplay.textContent = currentString;

  let timeLeft = 3;
  countdownEl.textContent = timeLeft;

  const timer = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft > 0 ? timeLeft : "";
    if (timeLeft === 0) {
      clearInterval(timer);
      stringDisplay.textContent = "";
      countdownEl.textContent = "";
      userInput.value = "";
      userInput.classList.remove("hidden");
      submitBtn.classList.remove("hidden");
      userInput.focus();
    }
  }, 1000);
}

function checkAnswer() {
  const userAnswer = userInput.value.trim().toLowerCase();
  if (userAnswer === currentString) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    round++;
    nextRound();
  } else {
    endGame();
  }
}

function endGame() {
  gameScreen.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
  finalScoreEl.textContent = score;
}

// Game Over "Play Again" button calls this
function restartGame() {
  goToStartScreen();
}




