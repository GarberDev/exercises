/** Database setup for users. */

const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///biztime_test";
} else {
  DB_URI = `postgresql://postgres:postgres@localhost:5432/biztime`;
}

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "biztime",
  password: "postgres",
  port: 5432,
});

db.connect();

module.exports = db;
