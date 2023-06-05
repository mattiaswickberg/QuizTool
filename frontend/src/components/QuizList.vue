<!-- frontend/src/components/QuizList.vue -->
<template>
      <div v-if="$route.path === '/'">
        <div class="card-container">
        <router-link :to="{ name: 'Quiz', params: { id: quiz.quiz_id } }" class="card" v-for="quiz in quizzes" :key="quiz.quiz_id">
            <h2>{{ quiz.title }}</h2>
            <p>{{ quiz.description }}</p>
        </router-link>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    props: {
      quizzes: Array
    }
  };
  </script>
  
  <style scoped>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .card {
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
    margin: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px 0 hsla(0, 0%, 0%, 0.2);
  }
  
  .card h2 {
    font-size: 1.2em;
    margin-bottom: 10px;
  }
  
  .card p {
    font-size: 0.9em;
    color: #666;
  }
  </style>
  