// frontend/src/App.vue
<template>
  <div id="app">
    <h1>Quizzes</h1>
    <ul>
      <li v-for="quiz in quizzes" :key="quiz.id">{{ quiz.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quizzes: []
    };
  },
  created() {
    // Fetch quizzes from your server
    fetch('http://localhost:3000/quizzes')
      .then(response => response.json())
      .then(quizzes => {
        this.quizzes = quizzes;
      });
  }
};
</script>
