// server.js
const express = require('express');
const mariadb = require('mariadb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const pool = mariadb.createPool({
     host: 'localhost', 
     user:'testuser', 
     password: 'test',
     database: 'quiztool',
     connectionLimit: 5
});

app.use(cors());

app.get('/quizzes', async (req, res) => {
  let conn;
  
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM quizzes");
    res.json(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
