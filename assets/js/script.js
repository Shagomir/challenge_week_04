//initialize variable for timer interval
var timerInterval;
var currentQuestionIndex;
var currentQuestion;
var score;

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
  question: "This is the fifth test question. A is the correct answer.",
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

function resetQuestions() {
  currentQuestionIndex = 0;
  currentQuestion = questionSelector[currentQuestionIndex];
  score = 0;
}

function endQuiz() {
    hideQuiz();
    hideStart();
    showScores();
    clearInterval(timerInterval);
    finalScoreEl.innerHTML = "Your final score is: " + score;
  }

function askQuestions() {
    questionEl.innerHTML = currentQuestion.question;
    aBtn.innerHTML = "A: " + currentQuestion.a;
    bBtn.innerHTML = "B: " + currentQuestion.b;
    cBtn.innerHTML = "C: " + currentQuestion.c;
    dBtn.innerHTML = "D: " + currentQuestion.d;
  }

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionSelector.length) {

    currentQuestion = questionSelector[currentQuestionIndex];
    askQuestions();
} else {  
    endQuiz();
  }
}



function answerQuestion(outcome) {
    if (outcome) {
      console.log("you answered correctly!");
      score += 5;
      console.log("your score is: " + score);
    } else {
      console.log("your answer was not correct.");
      console.log("your score is: " + score);
    }
    nextQuestion();
  }

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
      timerEl.innerHTML = seconds;
      console.log(seconds);
      if (seconds <= 0) {
        clearInterval(timerInterval);
        timerEl.innerHTML = "Time is Up!";
        endQuiz();
      }
    }, 1000);
  }

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();

  startQuiz(60);
});





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





resetBtn.addEventListener("click", function (e) {
    startQuiz(60);
  });

showStart();
hideQuiz();
hideScores();
