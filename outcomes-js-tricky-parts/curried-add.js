function curriedAdd(value) {
  if (typeof value !== "number") return 0;

  let total = value;

  function adder(nextValue) {
    if (typeof nextValue === "number") {
      total += nextValue;
      return adder;
    } else {
      return total;
    }
  }

  return adder;
}

module.exports = { curriedAdd };
