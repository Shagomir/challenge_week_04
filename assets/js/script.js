var quizTimer = 60; // this will update all timing related functions, edit this to adjust test duration.
var answerDelay = 0.25; // this updates the delay for showing an answer and the padding for bonus points.

// initialize global variables for tracking quiz progress and score.
// TODO put some of these in local/session storage?
var currentQuestionIndex;
var currentQuestion;
var score;
var bonus;
var highScoreList = [];

//player object for High Score list
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

// button selectors
var startBtn = document.querySelector("#startQuiz");
var aBtn = document.querySelector("#a");
var bBtn = document.querySelector("#b");
var cBtn = document.querySelector("#c");
var dBtn = document.querySelector("#d");
var resetBtn = document.querySelector("#restartQuiz");
var showScoreEl = document.querySelector("#visitHighScores");

// section selectors
var startSct = document.querySelector("#startButton");
var quizSct = document.querySelector("#quiz");
var scoresSct = document.querySelector("#highScores");

// Question Objects
var question0 = {
  question: "This is a test question. C is the correct answer.",
  a: "a wrong answer",
  b: "a tricky, but ultimately incorrect answer",
  c: "a correct answer",
  d: "another incorrect answer",
  answer: "c",
};

var question1 = {
  question: "This is the second test question. A is the correct answer.",
  a: "a correct answer",
  b: "a tricky, but ultimately incorrect answer",
  c: "a wrong answer",
  d: "another incorrect answer",
  answer: "a",
};

var question2 = {
  question: "This is the third test question. D is the correct answer.",
  a: "another incorrect answer",
  b: "a tricky, but ultimately incorrect answer",
  c: "a wrong answer",
  d: "a correct answer",
  answer: "d",
};

var question3 = {
  question: "This is the fourth test question. C is the correct answer.",
  a: "a wrong answer",
  b: "a tricky, but ultimately incorrect answer",
  c: "a correct answer",
  d: "another incorrect answer",
  answer: "c",
};

var question4 = {
  question: "This is the fifth test question. B is the correct answer.",
  a: "a tricky, but ultimately incorrect answer",
  b: "a correct answer",
  c: "a wrong answer",
  d: "another incorrect answer",
  answer: "b",
};

var question5 = {
  question: "This is the sixth test question. A is the correct answer.",
  a: "a correct answer",
  b: "a tricky, but ultimately incorrect answer",
  c: "a wrong answer",
  d: "another incorrect answer",
  answer: "a",
};

// question array. An array of objects, whee!
var questionSelector = [
  question0,
  question1,
  question2,
  question3,
  question4,
  question5,
];

// we only want to show the submission form to players who have completed the quiz.
function showSaveScore() {
  if (player.complete === true) {
    saveScoreEl.setAttribute("style", "display:initial");
  } else {
    saveScoreEl.setAttribute("style", "display:none");
  }
}

// functions to hide the various sections - very duplicative, but helps when deciding which parts of the page to show
function hideScores() {
  scoresSct.setAttribute("style", "display:none");
}
function hideQuiz() {
  quizSct.setAttribute("style", "display:none");
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
function showStart() {
  startSct.setAttribute("style", "display:initial");
}

// set instructions to start text with quiz timer variable.
function setStartText() {
  startTextEl.textContent =
    "Please press 'Start Quiz' to begin. You will have " +
    quizTimer +
    " seconds to complete the quiz.";
}

// re-initialize the questions to start the test over.
function resetQuestions() {
  currentQuestionIndex = 0;
  currentQuestion = questionSelector[currentQuestionIndex];
  score = 0;
}

//this ends the quiz and shows the score section. Bonus points for time remaining!
function endQuiz() {
  hideQuiz();
  hideStart();
  showScores();
  displayScoreList();
  player.complete = true; // mark player as completing the quiz
  showSaveScore(); // show the score submission form
  clearInterval(timerInterval); // cancel remaining time
  timerEl.innerHTML = "Test completed."; // overwrite timer element to clear remaining time display

  if (score === questionSelector.length * 5) {
    // max score gets bonus points equal to remaining seconds.
    player.totalScore = Number(score) + Number(bonus); // update score to player.
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
  aBtn.innerHTML = "A: " + currentQuestion.a;
  bBtn.innerHTML = "B: " + currentQuestion.b;
  cBtn.innerHTML = "C: " + currentQuestion.c;
  dBtn.innerHTML = "D: " + currentQuestion.d;
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
// and then shows the quiz again after two seconds.

function answerQuestion(outcome) {
  if (outcome) {
    score += 5;
    feedbackEl.innerHTML = "Your answer was correct!";
  } else {
    feedbackEl.innerHTML = "Sorry, your answer was not correct.";
  }
  hideQuiz();
  setTimeout(function () {
    feedbackEl.innerHTML = "";
    showQuiz();
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
function displayScoreList() {
  highScoreListEl.textContent = "";
  console.log(highScoreList);
  var highScoreListSort = highScoreList.sort((b, a) => a.totalScore < b.totalScore ? -1 : (a.totalScore > b.totalScore ? 1 : 0)) //hopefully sort the scores by value? From https://www.scaler.com/topics/javascript-sort-an-array-of-objects/
  console.log(highScoreListSort);
  for (var i = 0; i < highScoreListSort.length; i++) {
    var li = document.createElement("li");

    var rank = document.createElement("p");
    rank.textContent = i + 1;

    var initials = document.createElement("p");
    initials.textContent = highScoreListSort[i].initials;

    var score = document.createElement("p");
    score.textContent = highScoreListSort[i].totalScore;

    li.appendChild(rank);
    li.appendChild(initials);
    li.appendChild(score);

    li.setAttribute("data-index", i);
    highScoreListEl.appendChild(li);
  }
}

// add player score to high score list if they have completed the quiz.

function addPlayerScore() {
  if (player.complete === true) {
    highScoreList.push(player);
    player.complete = false;
  }
}

// updates the score list from storage, saves it to a new array, adds the player's score if they finished a game, and then pushes the updated list back to storage.
function updateScoreList() {
  var storedHighScoreList = JSON.parse(localStorage.getItem("highScoreList"));
  //   console.log("1", storedHighScoreList);
  //   console.log("1", highScoreList);
  if (storedHighScoreList !== null) {
    highScoreList = storedHighScoreList;
    // console.log("2", storedHighScoreList);
    // console.log("2", highScoreList);
  }
  addPlayerScore();
  // console.log("3", storedHighScoreList);
  // console.log("3", highScoreList);
  highScoreList.sort((x, y) => x.score < y.score); //hopefully sort the scores by value? From https://www.scaler.com/topics/javascript-sort-an-array-of-objects/
  localStorage.setItem("highScoreList", JSON.stringify(highScoreList));
  displayScoreList();
}

// adds initials to player object and kicks off high score list update.
function submitInitials(event) {
  event.preventDefault();
  var initials = document.querySelector("#initials").value;
  // console.log(initials);
  player.initials = initials.substring(0, 3).toUpperCase(); // we want 3 uppercase characters
  // console.log(player.initials);
  updateScoreList();
  document.querySelector("#initials").value = ""; // reset form
  player.complete = false; // update player state and hide form.
  showSaveScore();
}

// timer for the quiz. If the timer runs out, the quiz will end.
// calculates the potential bonus score for a full clear as well.
function timer() {
  var seconds = quizTimer;
  timerEl.innerHTML = "Time remaining: " + seconds + " seconds."; // resolve delay in timer appearing due to interval timing
  timerInterval = setInterval(function () {
    seconds--;
    bonus = Math.floor(seconds + answerDelay); // padding bonus to make up for the delay after answering a question. Rounds down.
    timerEl.innerHTML = "Time remaining: " + seconds + " seconds.";
    // console.log(seconds);
    if (seconds <= 0) {
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
    // console.log(typeof answer, answer);
    // console.log(typeof currentQuestion.answer, question0.answer);
    // console.log("You Pressed Button " + this.id);
    answerQuestion(answer === currentQuestion.answer);
  });
}

// event listener for starting the quiz
startBtn.addEventListener("click", function () {
  startQuiz();
});

// event listener for the reset button - it does the same as the start quiz button.
resetBtn.addEventListener("click", function () {
  startQuiz();
});

// go directly to the high scores list from the nav. This will cancel the test if you are currently taking it.
showScoreEl.addEventListener("click", function () {
  clearInterval(timerInterval);
  timerEl.innerHTML = "";
  hideQuiz();
  hideStart();
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
updateScoreList();
