const express = require("express");
const app = express();

//imports
const { mean, median, mode } = require("./operations");
const ExpressError = require("./expressError");

app.get("/mean", (req, res, next) => {
  try {
    const nums = parseNums(req.query.nums);
    const value = mean(nums);
    res.json({ operation: "mean", value });
  } catch (err) {
    return next(err);
  }
});

app.get("/median", (req, res, next) => {
  try {
    const nums = parseNums(req.query.nums);
    const value = median(nums);
    res.json({ operation: "median", value });
  } catch (err) {
    return next(err);
  }
});

app.get("/mode", (req, res, next) => {
  try {
    const nums = parseNums(req.query.nums);
    const value = mode(nums);
    res.json({ operation: "mode", value });
  } catch (err) {
    return next(err);
  }
});
//paresnums

function parseNums(numsStr) {
  if (!numsStr) {
    throw new ExpressError("numbers are required", 400);
  }
  const nums = numsStr.split(",").map(Number);
  if (nums.some(isNaN)) {
    throw new ExpressError("all numbers must be valid numbers", 400);
  }
  return nums;
}
//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});
//boilerplate
app.listen(3000, function () {
  console.log("App on port 3000");
});

module.exports = app;
