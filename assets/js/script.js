var cancelTimer = false;
var timerRunning = false;

function startTimer(seconds) {
  var timerEl = document.querySelector(".timer");
  timerEl.innerHTML = seconds;
  startBtn.setAttribute("style", "display:none");
  timerRunning = true;

  var x = setInterval(function () {
    seconds--;
    timerEl.innerHTML = seconds;
    console.log(seconds);
    
    if (seconds < 0) {
      clearInterval(x);
      timerEl.innerHTML = "END";
      console.log("END");
      timerRunning = false;
      startBtn.setAttribute("style", "display:initial");
    } 
    if ((cancelTimer === true)) {
      clearInterval(x);
      timerRunning = false;
      console.log("CANCELED");
      startBtn.setAttribute("style", "display:initial");
    }
  }, 1000);
}

var startBtn = document.querySelector("#startQuiz");
var resetBtn = document.querySelector("#resetTimer");

startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  if ((timerRunning === true)) {
    cancelTimer = true;
  }
  timerRunning = true;
  cancelTimer = false
  setTimeout(function () {
    startTimer(10);
  }, 1005);
});

resetBtn.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  cancelTimer = true;
  return;
});
