// add whatever parameters you deem necessary
function separatePositive(arr) {
  // pointers at the beginning and end of the array
  let start = 0;
  let end = arr.length - 1;

  // while start is less than end
  while (start < end) {
    // if both values are positive, move the left pointer right
    if (arr[start] < 0 && arr[end] > 0) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    } else if (arr[start] > 0) {
      // if left value is positive, move the left pointer right
      start++;
    } else {
      // else, move the right pointer left
      end--;
    }
  }

  return arr;
}
