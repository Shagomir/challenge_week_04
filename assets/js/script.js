var quizTimer = 90; // this will update all timing related functions, edit this to adjust test duration.
var answerDelay = 2; // this updates the delay for showing an answer and the padding for bonus points.

// initialize global variables for tracking quiz progress and score.
// TODO convert to a single quiz object?
var currentQuestionIndex;
var currentQuestion;
var score;
var bonus;
var highScoreList = [];

// initialize player object for High Score list
var player = {
  totalScore: 0,
  initials: "",
  complete: false,
};

// setting a global timer interval so multiple functions can access it.
// needed as both timer() and endQuiz() need to be able to stop the timer.
var timerInterval;

// element selectors
var timerEl = document.querySelector("#timer");
var answerButtonEl = document.querySelectorAll(".answerButton");
var questionEl = document.querySelector("#question");
var finalScoreEl = document.querySelector("#finalScore");
var feedbackEl = document.querySelector("#feedback");
var startTextEl = document.querySelector("#startText");
var saveScoreEl = document.querySelector("#saveScore");
var highScoreListEl = document.querySelector("#highScoreList");
var questionContainerEl = document.querySelector("#questionContainer");
var scoreHeaderContainerEl = document.querySelector("#scoreHeaderContainer")

// button selectors
var startBtn = document.querySelector("#startQuiz");
var aBtn = document.querySelector("#a");
var bBtn = document.querySelector("#b");
var cBtn = document.querySelector("#c");
var dBtn = document.querySelector("#d");
var showScoreEl = document.querySelector("#visitHighScores");

// section selectors
var startSct = document.querySelector("#startButton");
var quizSct = document.querySelector("#quiz");
var scoresSct = document.querySelector("#highScores");

// we only want to show the submission form to players who have completed the quiz.
function showSaveScore() {
  if (player.complete === true) {
    saveScoreEl.setAttribute("style", "display:initial");
  } else {
    saveScoreEl.setAttribute("style", "display:none");
  }
}

// functions to hide the various sections.
// Some redundancy, but helps when deciding which parts of the page to show
function hideScores() {
  scoresSct.setAttribute("style", "display:none");
}
function hideQuiz() {
  quizSct.setAttribute("style", "display:none");
}
function hideQuestion() {
  questionContainerEl.setAttribute("style", "display:none");
}
function hideStart() {
  startSct.setAttribute("style", "display:none");
}
function showScores() {
  scoresSct.setAttribute("style", "display:initial");
}
function showQuiz() {
  quizSct.setAttribute("style", "display:initial");
}
function showQuestion() {
  questionContainerEl.setAttribute("style", "display:flex");
}
function showStart() {
  startSct.setAttribute("style", "display:initial");
}

// set instructions to start text with quiz timer variable.
function setStartText() {
  startTextEl.innerHTML =
    "Welcome to the Javascript Fundamentals basic knowledge quiz. Please press 'Take Quiz' to begin. <br> You will have " +
    quizTimer +
    " seconds to complete the quiz.";
}

function shuffleQuestions() {
  var j, k;
  for (var i = 0; i < questionSelector.length; i++) {
    j = Math.floor(Math.random() * questionSelector.length);
    k = questionSelector[i];
    questionSelector[i] = questionSelector[j];
    questionSelector[j] = k;
  }
}

// reset the index and shuffle the questions to start the test over.
function resetQuestions() {
  shuffleQuestions();
  currentQuestionIndex = 0;
  currentQuestion = questionSelector[currentQuestionIndex];
  score = 0;
}

//this ends the quiz and shows the score section. Bonus points for time remaining!
function endQuiz() {
  // These functions update the page to display the correct sections and to generate the current score list
  hideQuiz();
  showStart();
  showScores();
  updateScoreList();

  // mark player as completing the quiz
  player.complete = true;

  // show the score submission form
  showSaveScore();

  // cancel remaining time
  clearInterval(timerInterval);

  // overwrite timer element to clear remaining time display
  timerEl.innerHTML = "Test completed.";

  // Update total score to player object. Max score gets bonus points equal to remaining seconds.
  if (score === questionSelector.length * 5) {
    player.totalScore = Number(score) + Number(bonus);
    finalScoreEl.innerHTML =
      "Wow! You got a perfect score! You receive " +
      bonus +
      " bonus points. Your final score is: " +
      player.totalScore;
  } else {
    player.totalScore = score;
    finalScoreEl.innerHTML = "Your final score is: " + player.totalScore;
  }
}

// This function sets the question elements and buttons based on the content of the current question.
function askQuestions() {
  questionEl.innerHTML = currentQuestion.question;
  aBtn.textContent = "A: " + currentQuestion.a;
  bBtn.textContent = "B: " + currentQuestion.b;
  cBtn.textContent = "C: " + currentQuestion.c;
  dBtn.textContent = "D: " + currentQuestion.d;
}

//increments the next question through the index, or ends the quiz if there are no more questions.
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionSelector.length) {
    currentQuestion = questionSelector[currentQuestionIndex];
    askQuestions();
  } else {
    endQuiz();
  }
}

// This gets passed a true or false value showing if the question was answered correctly.
// It displays feedback, increments the score, hides the quiz to prevent excess inputs,
// and then shows the quiz again after answerDelay number of seconds.

function answerQuestion(outcome) {
  if (outcome) {
    score += 5;
    feedbackEl.innerHTML = "Your answer was correct!";
  } else {
    feedbackEl.innerHTML = "Sorry, your answer was not correct.";
  }
  hideQuestion();
  setTimeout(function () {
    feedbackEl.innerHTML = "";
    showQuestion();
    nextQuestion();
  }, answerDelay * 1000);
}

// This function starts the quiz and sets the timer in motion.
function startQuiz() {
  player.complete = false;
  resetQuestions();
  hideScores();
  hideStart();
  showQuiz();
  askQuestions();
  timer(quizTimer);
}

// Clears the high score list and rebuilds it.
// Also sorts the scores by totalScore from highest to lowest.
// From https://www.scaler.com/topics/javascript-sort-an-array-of-objects/
function displayScoreList() {
  highScoreListEl.textContent = "";
  var highScoreListSort = highScoreList.sort((b, a) =>
    a.totalScore < b.totalScore ? -1 : a.totalScore > b.totalScore ? 1 : 0
  );

  // This loop runs through the high score list and builds list elements with separate <p> divs for each.
  for (var i = 0; i < highScoreListSort.length; i++) {
    var li = document.createElement("li");

    var rank = document.createElement("p");
    rank.textContent = i + 1;
    rank.setAttribute("class", "rank");

    var initials = document.createElement("p");
    initials.textContent = highScoreListSort[i].initials;
    initials.setAttribute("class", "player");

    var score = document.createElement("p");
    score.textContent = highScoreListSort[i].totalScore;
    score.setAttribute("class", "score");

    li.appendChild(rank);
    li.appendChild(initials);
    li.appendChild(score);

    li.setAttribute("data-index", i);
    highScoreListEl.appendChild(li);
  }
  // we give the end of the high score list special border properties.
  if (highScoreListEl.lastChild !== null) {
    highScoreListEl.lastChild.setAttribute("class", "last");
    scoreHeaderContainerEl.setAttribute("class", "")
  } else {
    document
      scoreHeaderContainerEl.setAttribute("class", "last");
  }
}

// add player score to high score list if they have completed the quiz.
function addPlayerScore() {
  if (player.complete === true) {
    highScoreList.push(player);
    player.complete = false;
  }
}

// updates the score list from storage, saves it to a new array,
// adds the player's score if they finished a game, and then pushes the updated list back to storage.
function updateScoreList() {
  var storedHighScoreList = JSON.parse(localStorage.getItem("highScoreList"));
  if (storedHighScoreList !== null) {
    highScoreList = storedHighScoreList;
  }
  addPlayerScore();
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
  displayScoreList();
}

// adds initials to player object and kicks off high score list update.
function submitInitials(event) {
  event.preventDefault();
  var initials = document.querySelector("#initials").value;
  player.initials = initials.substring(0, 3).toUpperCase(); // we want 3 uppercase characters
  updateScoreList();
  document.querySelector("#initials").value = ""; // reset form for next submission.
  player.complete = false; // update player state to prevent duplicate entries.
  showSaveScore(); // hides the form since we only need to submit once.
}

// timer for the quiz. If the timer runs out, the quiz will end.
// calculates the potential bonus score for a full clear as well.
function timer() {
  var seconds = quizTimer;
  // Update display before interval is set.
  // If not present, there is an awkward delay in the timer appearing.
  timerEl.innerHTML = "Time remaining: " + seconds + " seconds.";
  timerInterval = setInterval(function () {
    seconds--;
    // padding bonus to make up for the delay after answering a question. Rounds down.
    bonus = Math.floor(seconds + answerDelay);
    timerEl.innerHTML = "Time remaining: " + seconds + " seconds.";
    // console.log(seconds);
    if (seconds < 0) {
      clearInterval(timerInterval);
      timerEl.innerHTML = "Time is Up!";
      endQuiz();
    }
  }, 1000);
}

// Event listener for the answer buttons. It creates a listener for each button.
// When a button is pressed, it checks to see if it was the correct answer and calls
// the next function, passing true if the question was answered correctly, otherwise false.
for (var i = 0; i < answerButtonEl.length; i++) {
  answerButtonEl[i].addEventListener("click", function () {
    var answer = this.id.toString();
    answerQuestion(answer === currentQuestion.answer);
  });
}

// event listener for starting the quiz
startBtn.addEventListener("click", function () {
  startQuiz();
});

// go directly to the high scores list from the nav. This will cancel the test if you are currently taking it.
showScoreEl.addEventListener("click", function () {
  clearInterval(timerInterval);
  timerEl.innerHTML = "";
  hideQuiz();
  showStart();
  showScores();
  showSaveScore();
  updateScoreList();
});

// form listener
addEventListener("submit", submitInitials);

// set up initial conditions on page load.
setStartText();
showStart();
hideQuiz();
hideScores();
