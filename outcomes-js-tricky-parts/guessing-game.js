function guessingGame() {
  let number = Math.floor(Math.random() * 100);
  let guesses = 0;
  let won = false;

  return function (guess) {
    guesses++;

    if (won) return "The game is over, you already won!";

    if (guess < number) {
      return `${guess} is too low!`;
    } else if (guess > number) {
      return `${guess} is too high!`;
    } else {
      won = true;
      return `You win! You found ${number} in ${guesses} guesses.`;
    }
  };
}

module.exports = { guessingGame };
