// frontend/src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import QuizList from './components/QuizList.vue'
import Quiz from './components/Quiz.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: QuizList
  },
  {
    path: '/quizzes/:id',
    name: 'Quiz',
    component: Quiz
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
