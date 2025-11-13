const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over");
const stringDisplay = document.getElementById("stringDisplay");
const countdownEl = document.getElementById("countdown");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submitBtn");
const scoreDisplay = document.getElementById("scoreDisplay");
const finalScoreEl = document.getElementById("finalScore");
const levelDisplay = document.getElementById("levelDisplay");

let round = 1;
let score = 0;
let currentString = "";
let previousStrings = [];
let typingTimer;
let displayTimer;
let level = 1;
let questionInLevel = 1;

// Character sets (increasing difficulty)
const charSets = [
  "abcde", // very easy
  "abcdefghi", // easy
  "abcdefghijklm", // moderate
  "abcdefghijklmnopqrstuvwxyz", // all letters
  "abcdefghijklmnopqrstuvwxyz0123456789", // letters + numbers
  "abcdefghijklmnopqrstuvwxyz0123456789@#*", // add few symbols
  "abcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?", // all symbols + long
];

// Generate random string (unique recently)
function generateRandomString(length, charSet) {
  let result;
  do {
    result = "";
    for (let i = 0; i < length; i++) {
      result += charSet.charAt(Math.floor(Math.random() * charSet.length));
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
  level = 1;
  questionInLevel = 1;
  scoreDisplay.textContent = "";
  levelDisplay.textContent = `Level ${level}`;
  nextRound();
}

function goToStartScreen() {
  clearInterval(typingTimer);
  clearInterval(displayTimer);
  gameScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  scoreDisplay.textContent = "";
  userInput.value = "";
  countdownEl.textContent = "";
  stringDisplay.textContent = "";
  levelDisplay.textContent = "";
  round = 1;
  score = 0;
  level = 1;
  previousStrings = [];
}

function nextRound() {
  clearInterval(typingTimer);
  clearInterval(displayTimer);

  userInput.classList.add("hidden");
  submitBtn.classList.add("hidden");
  countdownEl.textContent = "";

  // Difficulty logic: choose charset & length
  let charSetIndex = Math.min(round - 1, charSets.length - 1);
  let charSet = charSets[charSetIndex];

  // String length increases slightly each level
  let length = 3 + (level - 1) * 2 + Math.floor((questionInLevel - 1) * 0.5);

  currentString = generateRandomString(length, charSet);
  stringDisplay.textContent = currentString;

  let timeLeft = 3;
  countdownEl.textContent = timeLeft;

  displayTimer = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft > 0 ? timeLeft : "";
    if (timeLeft === 0) {
      clearInterval(displayTimer);
      stringDisplay.textContent = "";
      userInput.value = "";
      userInput.classList.remove("hidden");
      submitBtn.classList.remove("hidden");
      userInput.focus();
      startTypingTimer();
    }
  }, 1000);
}

function startTypingTimer() {
  let timeLeft = 5;
  countdownEl.textContent = timeLeft;

  typingTimer = setInterval(() => {
    timeLeft--;
    countdownEl.textContent = timeLeft > 0 ? timeLeft : "";
    if (timeLeft <= 0) {
      clearInterval(typingTimer);
      checkAnswer();
    }
  }, 1000);
}

function checkAnswer() {
  clearInterval(typingTimer);
  const userAnswer = userInput.value.trim();
  if (userAnswer === currentString) {
    score++;
    scoreDisplay.textContent = `Score: ${score}`;

    // Go to next question
    questionInLevel++;
    round++;

    // After 3 questions → increase level
    if (questionInLevel > 3) {
      level++;
      questionInLevel = 1;
      levelDisplay.textContent = `Level ${level}`;
    }

    nextRound();
  } else {
    endGame();
  }
}

function endGame() {
  clearInterval(typingTimer);
  clearInterval(displayTimer);
  gameScreen.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
  finalScoreEl.textContent = score;
}

function restartGame() {
  goToStartScreen();
}








