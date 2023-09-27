// add whatever parameters you deem necessary
function sameFrequency(num1, num2) {
  // convert to strings and compare to see if they have the same frequency helping with time complexity
  let str1 = num1.toString();
  let str2 = num2.toString();

  // if strings are not the same length, return false
  if (str1.length !== str2.length) return false;

  // ojects to hold digit frequency
  let count1 = {};
  let count2 = {};

  // for each char in str1, add to count1
  for (let char of str1) {
    count1[char] = (count1[char] || 0) + 1;
  }

  // for each char in str2, add to count2
  for (let char of str2) {
    count2[char] = (count2[char] || 0) + 1;
  }

  // compare count1 and count2 keys and values
  for (let key in count1) {
    if (count1[key] !== count2[key]) return false;
  }
  // return true if all keys and values are the same
  return true;
}
