var spaceJamWords = [
  "bugs bunny",
  "basketball",
  "michael jordan",
  "looney toons",
  "monstars",
  "daffy duck",
  "slam dunk",
  "tune squad",
  "tweety bird",
  "bill murray",
  "alley oop",
  "air ball",
  "free throw",
  "rebound",
  "block",
  "assist",
  "backboard"
];
var answerArray = [];
var computerOption =
  spaceJamWords[Math.floor(Math.random() * spaceJamWords.length)];
var guessesSoFar = [];
var correctGuesses = [];
var guessesLeft = 9;
var seconds = 60;

$("#timer").text(seconds);

// console.log(computerOption)
for (var i = 0; i < computerOption.length; i++) {
  //answerArray[i] = "_";
  if (computerOption[i] == " ") {
    answerArray.push("  ");
  } else {
    answerArray.push("_");
  }
  // console.log(answerArray);
}

$("#yourguesses").text(guessesSoFar);
$("#wordToGuess").text(answerArray.join(" "));
$("#guessesleft").text(guessesLeft);
$("#correctguesses").text(correctGuesses);

function startTimer() {
  seconds = seconds - 1;
  $("#timer").text(seconds);

  if (seconds <= 0) {
    $("#mainBox").addClass("hide");

    clearInterval(timer);
    $("#highScore").removeClass("hide");
  }
}

$("#start-btn").on("click", function() {
  timer = setInterval(startTimer, 1000);
  $("#startscreen").addClass("hide");
  $("#mainBox").removeClass("hide");
  $("#timer").removeClass("hide");
});

function playGame(ev) {
  var userGuess = ev.key;
  alert(userGuess);
  if (
    computerOption.indexOf(userGuess) != -1 &&
    guessesSoFar.indexOf(userGuess) == -1
  ) {
    guessesSoFar.push(userGuess);
    correctGuesses.push(userGuess);
    $("#yourguesses").text(guessesSoFar);
    $("#correctguesses").text(correctGuesses);
  } else if (
    computerOption.indexOf(userGuess) == -1 &&
    guessesSoFar.indexOf(userGuess) == -1
  ) {
    guessesSoFar.push(userGuess);
    guessesLeft--;
    $("#yourguesses").text(guessesSoFar);
    $("#guessesleft").text(guessesLeft);
  }
}

document.onkeyup = playGame;
var disp = "";
function display() {
  for (var h = 0; h < computerOption.length; h++) {
    if (correctGuesses.indexOf(computerOption[h]) != -1) {
      disp = disp + computerOption[h];
    } else {
      disp = disp + " _ ";
    }
  }
  return disp;
  $("#wordToGuess").text(disp);
}
