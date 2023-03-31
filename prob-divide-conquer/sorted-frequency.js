function sortedFrequency(arr, num) {
  function binarySearch(arr, num, findFirst) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;
    let result = -1;

    while (leftIdx <= rightIdx) {
      let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
      let middleVal = arr[middleIdx];

      if (middleVal === num) {
        result = middleIdx;
        if (findFirst) {
          rightIdx = middleIdx - 1;
        } else {
          leftIdx = middleIdx + 1;
        }
      } else if (middleVal < num) {
        leftIdx = middleIdx + 1;
      } else {
        rightIdx = middleIdx - 1;
      }
    }
    return result;
  }

  let firstIndex = binarySearch(arr, num, true);
  if (firstIndex === -1) {
    return -1;
  }

  let lastIndex = binarySearch(arr, num, false);
  return lastIndex - firstIndex + 1;
}

module.exports = sortedFrequency;
