var spaceJamWords = [
  "bugs bunny",
  "basketball",
  "michael jordan",
  "looney toons",
  "monstarz",
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

var letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
var timerSet;
var userWord;
var answerArray = [];
var computerOption;
// spaceJamWords[Math.floor(Math.random() * spaceJamWords.length)];

var guessesSoFar = [];
var correctGuesses = [];
var guessesLeft = 9;
var seconds = 6000;

$("#timer").text(seconds);

// console.log(computerOption)
function generateUnderscore() {
  computerOption =
    spaceJamWords[Math.floor(Math.random() * spaceJamWords.length)];
  for (var i = 0; i < computerOption.length; i++) {
    //answerArray[i] = "_";
    if (computerOption[i] == " ") {
      answerArray.push("  ");
    } else {
      answerArray.push("_");
    }
    $("#wordToGuess").text(answerArray.join(" "));

    // console.log(computerOption);
    // console.log(answerArray);
    //push same underscores into a different array
  }
}

$("#yourguesses").text(guessesSoFar);
$("#guessesleft").text(guessesLeft);
$("#correctguesses").text(correctGuesses);

function startTimer() {
  seconds = seconds - 1;
  $("#timer").text(seconds);

  //this if statement is for when the player loses
  if (seconds === 0 || guessesLeft === 0) {
    $("#mainBox").addClass("hide");
    $("#gifs-appear-here img")
      .css("border", "0px solid red")
      .animate({
        borderWidth: "10px",
        borderColor: "#f37736"
      });
    // clearInterval(timer);
    $("#highScore").removeClass("hide");
    $("#score").removeClass("hide");
    $("#playagain").removeClass("hidden");
  }
}

$(".start-btn").on("click", function() {
  if (timerSet) clearInterval(timer);

  timer = setInterval(startTimer, 1000);
  timerSet = true;
  $("#startscreen").addClass("hide");
  $("#mainBox").removeClass("hide");
  $("#timer").removeClass("hide");
  $("#start-btn").addClass("hide");
  $("#wordToGuess").empty();
  $("#correctguesses").empty();
  $("#yourguesses").empty();
  $("#guessesleft").text("9");
  generateUnderscore();
  answerArray = [];
  guessesSoFar = [];
  correctGuesses = [];
  guessesLeft = 9;
  seconds = 6000;
});

$("#playagain").on("click", function() {
  guessesLeft = 9;
  seconds = 6000;
  answerArray = [];
  guessesSoFar = [];
  correctGuesses = [];
  guessesLeft = 9;
  $("#playagain").addClass("hidden");
  $("#highScore").addClass("hide");
  $("#startscreen").removeClass("hide");
  $("#timer").addClass("hide");
  $("#start-btn").removeClass("hide");
  $("#gifs-appear-here").empty();
});

function playGame(ev) {
  var userGuess = ev.key;

  if (!letters.includes(userGuess)) {
    return false;
  }
  // userWord = correctGuesses.join("").toString();
  //
  // if (userWord == computerOption) {
  //   console.log("hi");
  // }
  // if (computerOption == correctGuesses) {
  //   alert("hi");
  // }
  // check all the letters you selected are in the computer's answers.
  // everytime you press a key you check if the user's answers have all the letters in the
  // computer's answers

  if (
    computerOption.indexOf(userGuess) != -1 &&
    guessesSoFar.indexOf(userGuess) == -1
  ) {
    guessesSoFar.push(userGuess);
    correctGuesses.push(userGuess);
    $("#yourguesses").text(guessesSoFar);
    $("#correctguesses").text(correctGuesses);
    var dis = display();
    console.log(dis);
    $("#wordToGuess").text(dis);
  } else if (
    computerOption.indexOf(userGuess) == -1 &&
    guessesSoFar.indexOf(userGuess) == -1
  ) {
    guessesSoFar.push(userGuess);
    guessesLeft--;
    $("#yourguesses").text(guessesSoFar);
    $("#guessesleft").text(guessesLeft);
  }

  var winGif = dis;

  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    winGif +
    "&api_key=dc6zaTOxFJmzC&limit=10";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.data[0].images.fixed_height.url);
    var gifDiv = $("<div class= 'item'>");
    var gifImage = $("<img>");

    gifImage.attr("src", response.data[0].images.fixed_height.url);
    gifDiv.append(gifImage);

    $("#gifs-appear-here")
      .empty()
      .prepend(gifDiv);
  });
}

document.onkeyup = playGame;

function display() {
  var disp = "";
  for (var h = 0; h < computerOption.length; h++) {
    if (correctGuesses.indexOf(computerOption[h]) != -1) {
      disp = disp + computerOption[h];
    } else {
      disp = disp + " _ ";
    }
  }

  return disp;
}

//if you match the correct word then end the game and seconds left x 1000 for the score
