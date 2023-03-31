function countZeroes(arr) {
  function binarySearch(arr, val) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    while (leftIdx <= rightIdx) {
      let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
      let middleVal = arr[middleIdx];

      if (
        (middleIdx === 0 || arr[middleIdx - 1] !== val) &&
        middleVal === val
      ) {
        return middleIdx;
      } else if (middleVal === 1) {
        leftIdx = middleIdx + 1;
      } else {
        rightIdx = middleIdx - 1;
      }
    }
    return -1;
  }

  let firstZeroIndex = binarySearch(arr, 0);
  if (firstZeroIndex === -1) {
    return 0;
  }

  let lastIndex = binarySearch(arr, 1);
  if (lastIndex === -1) {
    lastIndex = arr.length;
  }
  return lastIndex - firstZeroIndex;
}

module.exports = countZeroes;
