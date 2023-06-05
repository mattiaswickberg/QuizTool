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
  
      const quizQuery = 'SELECT * FROM quizzes WHERE quiz_id = ?';
      const quiz = await conn.query(quizQuery, [id]);
  
      if (quiz.length === 0) {
        res.status(404).send({ error: 'Quiz not found' });
      } else {
        const questionsQuery = `
          SELECT q.question_id, q.question_text, q.question_type, o.option_id, o.option_text, a.is_correct, a.weight
          FROM questions q 
          LEFT JOIN options o ON q.question_id = o.question_id
          LEFT JOIN answers a ON o.option_id = a.option_id
          WHERE q.quiz_id = ?
          ORDER BY q.question_id, o.option_id
        `;
        const rows = await conn.query(questionsQuery, [id]);
  
        // Group options under their associated questions
        const questions = rows.reduce((questions, row) => {
          let question = questions.find(q => q.question_id === row.question_id);
          if (!question) {
            question = {
              question_id: row.question_id,
              question_text: row.question_text,
              question_type: row.question_type,
              options: [],
            };
            questions.push(question);
          }
          question.options.push({
            option_id: row.option_id,
            option_text: row.option_text,
            is_correct: row.is_correct,
            weight: row.weight,
          });
          return questions;
        }, []);
  
        res.json({
          quiz: quiz[0],
          questions: questions,
        });
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
