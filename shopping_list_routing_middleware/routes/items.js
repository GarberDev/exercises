const express = require("express");

const items = require("../fakeDb");

const router = express.Router();

// GET /items
router.get("", (req, res, next) => {
  try {
    return res.json(items);
  } catch (err) {
    return next(err);
  }
});

// POST /items
router.post("", (req, res, next) => {
  try {
    let newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.json({ added: newItem });
  } catch (err) {
    return next(err);
  }
});

// GET /items/:name
router.get("/:name", (req, res, next) => {
  try {
    let foundItem = items.find((item) => item.name === req.params.name);
    if (!foundItem) return res.json({ error: "Item not found" });
    return res.json(foundItem);
  } catch (err) {
    return next(err);
  }
});

// PATCH /items/:name
router.patch("/:name", (req, res, next) => {
  try {
    let foundItem = items.find((item) => item.name === req.params.name);
    if (!foundItem) return res.json({ error: "Item not found" });

    foundItem.name = req.body.name || foundItem.name;
    foundItem.price = req.body.price || foundItem.price;

    return res.json({ updated: foundItem });
  } catch (err) {
    return next(err);
  }
});

// DELETE /items/:name
router.delete("/:name", (req, res, next) => {
  try {
    let foundItemIndex = items.findIndex(
      (item) => item.name === req.params.name
    );
    if (foundItemIndex === -1) return res.json({ error: "Item not found" });

    items.splice(foundItemIndex, 1);
    return res.json({ message: "Deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
