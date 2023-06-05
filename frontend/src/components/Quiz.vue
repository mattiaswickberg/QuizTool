<!-- frontend/src/components/Quiz.vue -->
<template>
    <div>
      <h1>{{ quiz ? quiz.title : 'Loading...' }}</h1>
      <p>{{ quiz ? quiz.description : '' }}</p>
      <button @click="$router.push('/')">Back to list</button>
  
      <div v-if="quiz">
        <div v-for="question in questions" :key="question.question_id">
          <h2>{{ question.question_text }}</h2>
          <div v-for="option in question.options" :key="option.option_id">
            <label>
              <input type="radio" :name="'question' + question.question_id" :value="option.option_id">
              {{ option.option_text }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        quiz: null,
        questions: [],
      };
    },
    async created() {
      const response = await fetch(`http://localhost:3000/quiz/${this.$route.params.id}`);
      const data = await response.json();
      this.quiz = data.quiz;
      this.questions = data.questions;
    },
  };
  </script>
  