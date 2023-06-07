const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const quizRoutes = require('./routes/quizRoutes')

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(helmet())
app.use(express.json())

app.use('/quiz', quizRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
