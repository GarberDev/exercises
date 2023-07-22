const express = require("express");
const router = new express.Router();

const db = require("../db");

router.get("/", async (req, res, next) => {
  const result = await db.query("SELECT * FROM companies");
  return res.json({ companies: result.rows });
});

router.get("/:code", async (req, res, next) => {
  const result = await db.query("SELECT * FROM companies WHERE code = $1", [
    req.params.code,
  ]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Company Not Found" });
  }
  return res.json({ company: result.rows[0] });
});

router.post("/", async (req, res, next) => {
  const result = await db.query(
    "INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *",
    [req.body.code, req.body.name, req.body.description]
  );
  return res.status(201).json({ company: result.rows[0] });
});

router.put("/:code", async (req, res, next) => {
  const result = await db.query(
    "UPDATE companies SET name=$1, description=$2 WHERE code = $3 RETURNING *",
    [req.body.name, req.body.description, req.params.code]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Company Not Found" });
  }
  return res.json({ company: result.rows[0] });
});

router.delete("/:code", async (req, res, next) => {
  const result = await db.query(
    "DELETE FROM companies WHERE code = $1 RETURNING *",
    [req.params.code]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Company Not Found" });
  }
  return res.json({ status: "deleted" });
});

module.exports = router;
