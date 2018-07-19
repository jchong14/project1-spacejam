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
var seconds = 6000;

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

  if (seconds <= 0 || guessesLeft == 0) {
    $("#mainBox").addClass("hide");
    $("#gifs-appear-here img")
      .css("border", "0px solid yellowgreen")
      .animate({
        borderWidth: "10px",
        borderColor: "#f37736"
      });
    // clearInterval(timer);
    $("#highScore").removeClass("hide");
    $("#score").removeClass("hide");
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

//make an array called letters and check if what key they pressed is inside letters.
// $("#wordToGuess").push(element);

//if(ev.keyCode >=97 && ev.keyCode <=122) {
//     $('#letters-guessed').append(userGuess + ", ");
// }else{
//     alert("Please enter a letter");
