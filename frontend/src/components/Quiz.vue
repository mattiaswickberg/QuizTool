<!-- frontend/src/components/Quiz.vue -->
<template>
    <div>
      <h1>{{ quiz ? quiz.title : 'Loading...' }}</h1>
      <p>{{ quiz ? quiz.description : '' }}</p>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  

<script>
export default {
  props: ['id'],
  data() {
    return {
      quiz: null,
      error: null
    };
  },
  created() {
    // Fetch the quiz from your server
    fetch(`http://localhost:3000/quiz/${this.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(quiz => {
        this.quiz = quiz;
      })
      .catch(error => {
        this.error = error.message;
      });
  }
};
</script>
