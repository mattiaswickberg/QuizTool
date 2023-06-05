// server.js
const express = require('express')
const mariadb = require('mariadb')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const helmet = require('helmet')

let credentials = require('./credentials.json')
let hostName = credentials.hostname
let username = credentials.username
let pw = credentials.password

const pool = mariadb.createPool({
  host: hostName,
  user: username,
  password: pw,
  database: 'quiztool',
  connectionLimit: 5
})

// Middleware
app.use(cors())
app.use(helmet());

app.get('/quizzes', async (req, res) => {
  let conn

// Temporary, gets list of quizzes from database
  try {
    conn = await pool.getConnection()
    const rows = await conn.query('SELECT * FROM quizzes')
    res.json(rows)
  } catch (err) {
    throw err
  } finally {
    if (conn) return conn.end()
  }
})

app.get('/quiz/:id', async (req, res) => {
    let conn;
  
    try {
      conn = await pool.getConnection();
      const { id } = req.params;
      const rows = await conn.query('SELECT * FROM quizzes WHERE quiz_id = ?', [id]);
  
      if (rows.length === 0) {
        res.status(404).send({ error: 'Quiz not found' });
      } else {
        res.json(rows[0]);
      }
    } catch (err) {
      res.status(500).send({ error: 'Database error' });
    } finally {
      if (conn) {
        conn.end();
      }
    }
  });
  
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
