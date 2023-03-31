function findRotatedIndex(arr, num) {
  function binarySearch(arr, num, leftIdx, rightIdx) {
    while (leftIdx <= rightIdx) {
      let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
      let middleVal = arr[middleIdx];

      if (middleVal === num) {
        return middleIdx;
      } else if (middleVal < num) {
        leftIdx = middleIdx + 1;
      } else {
        rightIdx = middleIdx - 1;
      }
    }
    return -1;
  }

  function findRotationIndex(arr) {
    let leftIdx = 0;
    let rightIdx = arr.length - 1;

    while (leftIdx < rightIdx) {
      let middleIdx = Math.floor((leftIdx + rightIdx) / 2);

      if (arr[middleIdx] > arr[rightIdx]) {
        leftIdx = middleIdx + 1;
      } else {
        rightIdx = middleIdx;
      }
    }
    return leftIdx;
  }

  let rotationIndex = findRotationIndex(arr);

  if (num >= arr[0]) {
    return binarySearch(arr, num, 0, rotationIndex - 1);
  } else {
    return binarySearch(arr, num, rotationIndex, arr.length - 1);
  }
}

module.exports = findRotatedIndex;
