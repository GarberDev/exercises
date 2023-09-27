// add whatever parameters you deem necessary
function averagePair(arr, target) {
  //start pointer at the beginning
  let start = 0;
  //end pointer at the end
  let end = arr.length - 1;

  //while start is less than end
  while (start < end) {
    //average of end and start
    let avg = (arr[start] + arr[end]) / 2;
    //if the average is the target return true
    if (avg === target) {
      return true;
    } else if (avg < target) {
      // if average is less, move start forward
      start++;
    } else {
      // if average is more, move end back
      end--;
    }
  }

  // false if no match
  return false;
}
