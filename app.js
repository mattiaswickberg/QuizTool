// server.js
const express = require('express')
const mariadb = require('mariadb')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const helmet = require('helmet')
const fs = require('fs')

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
