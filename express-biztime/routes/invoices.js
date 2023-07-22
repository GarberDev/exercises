const express = require("express");
const router = new express.Router();
const db = require("../db");

router.get("/", async (req, res, next) => {
  const result = await db.query("SELECT id, comp_code FROM invoices");
  return res.json({ invoices: result.rows });
});

router.get("/:id", async (req, res, next) => {
  const result = await db.query("SELECT * FROM invoices WHERE id = $1", [
    req.params.id,
  ]);
  const invoice = result.rows[0];
  if (invoice) {
    return res.json({ invoice });
  } else {
    return res.sendStatus(404);
  }
});

router.post("/", async (req, res, next) => {
  const result = await db.query(
    "INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date",
    [req.body.comp_code, req.body.amt]
  );
  return res.status(201).json({ invoice: result.rows[0] });
});

router.put("/:id", async (req, res, next) => {
  const result = await db.query(
    "UPDATE invoices SET amt=$1 WHERE id=$2 RETURNING id, comp_code, amt, paid, add_date, paid_date",
    [req.body.amt, req.params.id]
  );
  if (result.rows[0]) {
    return res.json({ invoice: result.rows[0] });
  } else {
    return res.sendStatus(404);
  }
});

router.delete("/:id", async (req, res, next) => {
  const result = await db.query(
    "DELETE FROM invoices WHERE id = $1 RETURNING id",
    [req.params.id]
  );
  if (result.rows.length === 0) {
    return res.sendStatus(404);
  } else {
    return res.json({ status: "deleted" });
  }
});

module.exports = router;
