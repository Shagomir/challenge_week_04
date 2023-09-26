var cancelTimer = false;
var timerRunning = false;
var timerInterval;
var timerEl = document.querySelector(".timer");

function startTimer(seconds) {
  var timerEl = document.querySelector(".timer");
  timerEl.innerHTML = seconds;
  startBtn.setAttribute("style", "display:none");

  timerInterval = setInterval(function () {
    seconds--;
    timerEl.innerHTML = seconds;
    console.log(seconds);

    if (seconds < 0) {
      clearInterval(timerInterval);
      timerEl.innerHTML = "END";
      console.log("END");
      startBtn.setAttribute("style", "display:initial");
    }
  }, 1000);
}

var startBtn = document.querySelector("#startQuiz");
var resetBtn = document.querySelector("#resetTimer");

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  clearInterval(timerInterval);
  startTimer(10);
});

resetBtn.addEventListener("click", function (e) {
  clearInterval(timerInterval);
  startBtn.setAttribute("style", "display:initial");
  console.log("CANCELLED");
  timerEl.innerHTML = "CANCELLED";
  return;
});
