//mean function

function mean(nums) {
  if (!nums.length) return NaN;

  const total = nums.reduce((acc, curr) => {
    if (isNaN(curr)) return NaN;
    return acc + curr;
  }, 0);

  return total / nums.length;
}
//median function

function median(nums) {
  if (!nums.length) return NaN;

  nums.sort((a, b) => a - b);
  const mid = Math.floor(nums.length / 2);
  return nums.length % 2 !== 0 ? nums[mid] : (nums[mid] + nums[mid - 1]) / 2;
}
//mode function
function mode(nums) {
  if (!nums.length) return NaN;

  const freq = nums.reduce((acc, curr) => {
    if (isNaN(curr)) return acc;
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  let maxFreq = 0;
  let mode;
  for (let num in freq) {
    if (freq[num] > maxFreq) {
      maxFreq = freq[num];
      mode = Number(num);
    }
  }
  return mode;
}

module.exports = {
  mean,
  median,
  mode,
};
