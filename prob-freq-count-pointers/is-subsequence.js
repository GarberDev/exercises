// add whatever parameters you deem necessary
function isSubsequence(str1, str2) {
  // pointers at start and end of str1
  let start = 0;
  let end = 0;

  // while end is less than str2 length
  while (end < str2.length) {
    // if characters match, move the str1 pointer
    if (str1[start] === str2[end]) start++;
    // if all characters have matched, return true
    if (start === str1.length) return true;
    // move the str2 pointer
    end++;
  }

  //if no match, return false
  return false;
}
