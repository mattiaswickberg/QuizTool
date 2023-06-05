// frontend/src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import QuizList from '../components/QuizList.vue';
import Quiz from '../components/Quiz.vue';

const routes = [
  {
    path: '/',
    name: 'QuizList',
    component: QuizList
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: Quiz,
    props: true
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
