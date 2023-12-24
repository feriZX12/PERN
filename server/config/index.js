require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const database =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_DB_TEST
    : process.env.POSTGRES_DB;

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${database}`;
const pool = new Pool({
  connectionString,
  /*
    SSL is not supported in development
    */
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// // Function to check the database connection
// async function checkDatabaseConnection() {
//   try {
//     await pool.query("SELECT 1");
//     console.log("Database connection successful!");
//   } catch (error) {
//     console.error("Database connection error:", error);
//   } finally {
//     pool.end(); // Close the database connection
//   }
// }

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};

// Call the checkDatabaseConnection function to test the connection
// checkDatabaseConnection();
