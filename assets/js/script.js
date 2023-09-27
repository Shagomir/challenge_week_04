//initialize variable for timer interval
var timerInterval;
var currentQuestionIndex;
var currentQuestion;
var score;
var bonus;
var totalScore

// element selectors
var timerEl = document.querySelector("#timer");
var answerButtonEl = document.querySelectorAll(".answerButton");
var questionEl = document.querySelector("#question");
var aBtn = document.querySelector("#a");
var bBtn = document.querySelector("#b");
var cBtn = document.querySelector("#c");
var dBtn = document.querySelector("#d");
var startSct = document.querySelector("#startButton");
var quizSct = document.querySelector("#quiz");
var scoresSct = document.querySelector("#highScores");
var startBtn = document.querySelector("#startQuiz");
var resetBtn = document.querySelector("#restartQuiz");
var finalScoreEl = document.querySelector("#finalScore");
var feedbackEl = document.querySelector("#feedback");

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

// question array
var questionSelector = [
  question0,
  question1,
  question2,
  question3,
  question4,
  question5,
];

// localStorage.setItem("questions", JSON.stringify(questionSelector));

// functions to hide the various sections - very duplicative, but helps when deciding which parts of the page to show.

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
  clearInterval(timerInterval);
  timerEl.innerHTML = "Test completed.";
  totalScore = Number(score) + Number(bonus)

  if (score === questionSelector.length * 5) {
    finalScoreEl.innerHTML =
      "Wow! You got a perfect score. You receive " +
      bonus +
      " bonus points. Your final score is: " +
      totalScore;
  } else {
    finalScoreEl.innerHTML = "Your final score is: " + totalScore;
  }
  //function to submit score will go here. 
}

// This function sets the question divs based on the content of the current question. 
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

// This gets passed a true or false value showing if the question was answered correctly. It displays feedback, hides the quiz to prevent excess inputs, and then shows the quiz again after two seconds.

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
  }, 2000);
}

// This function starts the quiz and sets the timer in motion. It will also end the test if the user runs out of time.

function startQuiz(seconds) {
  var timerEl = document.querySelector("#timer");
  timerEl.innerHTML = seconds;
  resetQuestions();
  hideScores();
  hideStart();
  showQuiz();
  askQuestions();
  timerInterval = setInterval(function () {
    seconds--;
    bonus = seconds
    timerEl.innerHTML = "Time remaining: " + seconds + " seconds.";
    console.log(seconds);
    if (seconds <= 0) {
      clearInterval(timerInterval);
      timerEl.innerHTML = "Time is Up!";
      endQuiz();
    }
  }, 1000);
}

// event listener for the answer buttons. It creates a listener for each button. When a button is pressed, it checks to see if it was the correct answer and calls the next function.
for (var i = 0; i < answerButtonEl.length; i++) {
  answerButtonEl[i].addEventListener("click", function (e) {
    e.preventDefault();
    var answer = this.id.toString();
    console.log(typeof answer, answer);
    console.log(typeof currentQuestion.answer, question0.answer);
    console.log("You Pressed Button " + this.id);
    answerQuestion(answer === currentQuestion.answer);
  });
}

// event listener for starting the quiz
startBtn.addEventListener("click", function () {
  startQuiz(60);
});

// event listener for the reset button - it does the same as the start quiz button. Looking into combining these two.
resetBtn.addEventListener("click", function (e) {
  startQuiz(60);
});

showStart();
hideQuiz();
hideScores();
