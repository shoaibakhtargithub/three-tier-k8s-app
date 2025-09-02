const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "raja@123",
  database: process.env.DB_NAME || "todo_db",
  port: process.env.DB_PORT || 3307, // because you mapped 3307:3306
});

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// API routes
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/tasks", (req, res) => {
  const { task } = req.body;
  db.query(
    "INSERT INTO tasks (task) VALUES (?)",
    [task],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json({ id: results.insertId, task, status: "pending" });
    }
  );
});

app.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
