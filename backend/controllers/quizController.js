const db = require('../database/database')

exports.getQuizzes = async (req, res) => {
  let conn

  try {
    conn = await db.getConnection()
    const rows = await conn.query('SELECT * FROM quizzes')
    res.json(rows)
  } catch (err) {
    throw err
  } finally {
    if (conn) {
      await conn.end()
    }
  }
}

exports.getQuizById = async (req, res) => {
  let conn

  try {
    conn = await db.getConnection()
    const { id } = req.params

    const quizQuery = 'SELECT * FROM quizzes WHERE quiz_id = ?'
    const quiz = await conn.query(quizQuery, [id])

    if (quiz.length === 0) {
      res.status(404).send({ error: 'Quiz not found' })
    } else {
      const questionsQuery = `
          SELECT q.question_id, q.question_text, q.question_type, o.option_id, o.option_text, a.is_correct, a.weight
          FROM questions q 
          LEFT JOIN options o ON q.question_id = o.question_id
          LEFT JOIN answers a ON o.option_id = a.option_id
          WHERE q.quiz_id = ?
          ORDER BY q.question_id, o.option_id
        `
      const rows = await conn.query(questionsQuery, [id])

      // Group options under their associated questions
      const questions = rows.reduce((questions, row) => {
        let question = questions.find(q => q.question_id === row.question_id)
        if (!question) {
          question = {
            question_id: row.question_id,
            question_text: row.question_text,
            question_type: row.question_type,
            options: []
          }
          questions.push(question)
        }
        question.options.push({
          option_id: row.option_id,
          option_text: row.option_text,
          is_correct: row.is_correct,
          weight: row.weight
        })
        return questions
      }, [])

      res.json({
        quiz: quiz[0],
        questions: questions
      })
    }
  } catch (err) {
    res.status(500).send({ error: 'Database error' })
  } finally {
    if (conn) {
      conn.end()
    }
  }
}

exports.submitQuiz = async (req, res) => {
  let conn

  try {
    conn = await db.getConnection()
    const { quizId, answers } = req.body

    // Get the correct answers from the database
    const correctAnswersQuery = `
        SELECT question_id, option_id
        FROM answers
        WHERE is_correct = 1
        AND question_id IN (
          SELECT question_id
          FROM questions
          WHERE quiz_id = ?
        )
      `
    const correctAnswersRows = await conn.query(correctAnswersQuery, [quizId])

    // Convert the correct answers to a more convenient format
    const correctAnswers = correctAnswersRows.reduce((obj, row) => {
      obj[row.question_id] = row.option_id
      return obj
    }, {})

    // Calculate the score
    let score = 0
    for (const questionId in correctAnswers) {
      if (correctAnswers[questionId] === answers[questionId]) {
        score++
      }
    }

    // Return the result of the quiz
    res.json({
      score: score,
      total: Object.keys(correctAnswers).length
    })
  } catch (err) {
    res.status(500).send({ error: 'Database error' })
  } finally {
    if (conn) {
      conn.end()
    }
  }
}
