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
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_NAME ,
  port: process.env.DB_PORT 
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

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
