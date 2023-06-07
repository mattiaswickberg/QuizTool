const express = require('express')
const quizController = require('../controllers/quizController')

const router = express.Router()

router.get('/', quizController.getQuizzes)
router.get('/:id', quizController.getQuizById)
router.post('/submit-quiz', quizController.submitQuiz)

module.exports = router
