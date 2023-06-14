/** product: calculate the product of an array of numbers. */

function product(nums, i = 0) {
  if (i === nums.length) return 1;
  return nums[i] * product(nums, i + 1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, i = 0, longestWord = 0) {
  if (i === words.length) return longestWord;
  longestWord = Math.max(words[i].length, longestWord);
  return longest(words, i + 1, longestWord);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, i = 0, result = "") {
  if (i >= str.length) return result;
  result += str[i];
  return everyOther(str, i + 2, result);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i = 0) {
  if (i === arr.length) return -1;
  if (arr[i] === val) return i;
  return findIndex(arr, val, i + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, i = str.length - 1, result = "") {
  if (i < 0) return result;
  result += str[i];
  return revString(str, i - 1, result);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let stringArray = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      stringArray.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      stringArray.push(...gatherStrings(obj[key]));
    }
  }
  return stringArray;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, start = 0, end = arr.length) {
  if (start > end) return -1;
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === val) return mid;
  if (arr[mid] < val) return binarySearch(arr, val, mid + 1, end);
  return binarySearch(arr, val, start, mid - 1);
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch,
};
