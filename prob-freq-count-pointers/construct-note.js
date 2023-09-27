// add whatever parameters you deem necessary
function constructNote(message, letters) {
  // object to for frequency of letters
  let lettersCount = {};

  // loop through letters and add to lettersCount
  for (let letter of letters) {
    // if letter exists, add 1 to count, else set to 1 "lettersCount not letterCount"
    lettersCount[letter] = (lettersCount[letter] || 0) + 1;
  }

  // loop through message with char
  for (let char of message) {
    // if char doesn't exist in lettersCount, return false
    if (!lettersCount[char]) {
      return false;
    }
    // decrement count of char
    lettersCount[char]--;
  }
  // if all chars in message are in lettersCount, return true
  return true;
}
