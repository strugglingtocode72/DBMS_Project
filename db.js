require("dotenv").config();
const { Pool } = require("pg");

// connect to db
try {
  const pool = new Pool({
    user: "postgres", // add own username for testing
    host: process.env.DB_HOST,
    database: "DBMS-HBO", // add db name running locally
    password: process.env.DB_PASS,
    port: 5432,
  });
  module.exports = { pool };
} catch (err) {
  console.log("hELLO");
  console.log(err);
}
