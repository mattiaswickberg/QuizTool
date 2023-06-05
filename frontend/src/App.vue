<!-- frontend/src/App.vue -->
<template>
  <div id="app">
    <h1>Quizzes</h1>
    <router-view/>
    <QuizList :quizzes="quizzes" />
  </div>
</template>

<script>
import QuizList from './components/QuizList.vue';

export default {
  components: {
    QuizList
  },
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

<style>
#app {
  text-align: center;
  padding: 20px;
}
</style>
