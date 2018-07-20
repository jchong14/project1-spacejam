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
var answerArray = [];
var computerOption =
  spaceJamWords[Math.floor(Math.random() * spaceJamWords.length)];
var guessesSoFar = [];
var correctGuesses = [];
var guessesLeft = 9;
var seconds = 6;

$("#timer").text(seconds);

// console.log(computerOption)
for (var i = 0; i < computerOption.length; i++) {
  //answerArray[i] = "_";
  if (computerOption[i] == " ") {
    answerArray.push("  ");
  } else {
    answerArray.push("_");
  }
  // console.log(computerOption);
  // console.log(answerArray);
}

$("#yourguesses").text(guessesSoFar);
$("#wordToGuess").text(answerArray.join(" "));
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
    $("#playagain").removeClass("hide");
    $("#score").removeClass("hide");
  }
}

$(".start-btn").on("click", function() {
  if (timerSet) clearInterval(timer);

  timer = setInterval(startTimer, 1000);
  timerSet = true;

  answerArray = [];
  guessesSoFar = [];
  correctGuesses = [];
  guessesLeft = 9;
  seconds = 6;

  $("#startscreen").addClass("hide");
  $("#mainBox").removeClass("hide");
  $("#timer").removeClass("hide");
  $("#start-btn").addClass("hide");
  $("#playagain").addClass("hide");
});

$("#playagain").on("click", function() {
  $("#startscreen").removeClass("hide");
  $("#playagain").addClass("hide");
  $("#highScore").addClass("hide");
  $("#timer").addClass("hide");
  $("#start-btn").removeClass("hide");
  $("#gifs-appear-here").empty();
});

function playGame(ev) {
  var userGuess = ev.key;

  if (!letters.includes(userGuess)) {
    return false;
  }

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

//create a function to check all the letters you selected are in the computer's answers.
// everytime you press a key you check if the user's answers have all the letters in the
// computer's answers

//if you match the correct word then end the game and seconds left x 1000 for the score

//if you lose then use a designated loser gif

//make the gifs rated g
