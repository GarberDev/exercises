// Select the form and input elements
const $form = $("form");
const $input = $("#word");
$("#play-again").hide();
// Set a timer for 60 seconds
let timer = setTimeout(() => {
  $input.prop("disabled", true);
  alert("Time's up!");
}, 60000);

function checkWord(event) {
  event.preventDefault(); // prevent the form from submitting and refreshing the page
  const guess = $input.val(); // get the user's guess from the form

  // Only add to score if guess is valid and at least 2 letters long
  if (guess.length >= 2) {
    axios
      .get("/check-word", { params: { word: guess } })
      .then((response) => {
        const result = response.data.result;
        if (result === "ok") {
          $("#message").text(`${guess} is a valid word on the board!`);
          const score = parseInt($("#score").text()) + guess.length;
          $("#score").text(score);

          // Add the correct guess to the results div
          $("#result").append(`<li>${guess}</li>`);
        } else if (result === "not-on-board") {
          $("#message").text(`${guess} is not a valid word on this board.`);
        } else {
          $("#message").text(`${guess} is not a valid word.`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Clear input field and reset focus
  $input.val("");
  $input.focus();
}

$form.on("submit", checkWord);

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      $('input[type="submit"]').attr("disabled", "disabled");
      $('input[type="text"]').attr("disabled", "disabled");
      endGame();
    }
  }, 1000);
}

window.onload = function () {
  var timer = 60,
    display = document.querySelector("#timer");
  startTimer(timer, display);
};
// endGame function to clearInterval hide the board and show the score, and the play again button, and log hight score
function endGame() {
  clearInterval(timer);
  let scoreValue = parseInt($("#score").text());
  if (isNaN(scoreValue)) {
    scoreValue = 0;
  }
  $("#boggle").hide();
  $("#timer").hide();
  $("#score").show();
  $("#play-again").show();
  $("#message").text("Game Over!");
  $("#message").show();
  $("#score").text("Your Score is: " + scoreValue);
  $("#score").show();
  $("#play-again").show();
  $("#play-again").text("Play Again");
  $("#play-again").show();
  $("#play-again").click(function () {
    location.reload();
  });

  // Send AJAX request to update high score
  axios
    .post("/update-score", { score: scoreValue })
    .then((response) => {
      const highScore = response.data.highScore;
      console.log("High score:", highScore);
    })
    .catch((error) => {
      console.log(error);
    });
}
