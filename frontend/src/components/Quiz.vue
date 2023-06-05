<!-- frontend/src/components/Quiz.vue -->
<template>
    <div>
      <h1>{{ quiz ? quiz.title : 'Loading...' }}</h1>
      <p>{{ quiz ? quiz.description : '' }}</p>
      <button @click="$router.push('/')">Back to list</button>
  
      <div v-if="quiz">
        <form @submit.prevent="submitQuiz(quiz.quiz_id)">
      <div v-for="question in questions" :key="question.question_id">
        <h3>{{ question.question_text }}</h3>

        <div v-for="option in question.options" :key="option.option_id">
          <label>
            <input
              type="radio"
              :name="question.question_id"
              :value="option.option_id"
              v-model="answers[question.question_id]"
            >
            {{ option.option_text }}
          </label>
        </div>
      </div>

      <button type="submit">Submit Quiz</button>
    </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        quiz: null,
        questions: [],
        answers: {},
      };
    },
    async created() {
      const response = await fetch(`http://localhost:3000/quiz/${this.$route.params.id}`);
      const data = await response.json();
      this.quiz = data.quiz;
      this.questions = data.questions;
    },
    methods: {
    async submitQuiz(quizId) {
      try {
        const response = await axios.post('http://localhost:3000/submit-quiz', {
          quizId: quizId,
          answers: this.answers,
        });

        // Display the result of the quiz
        alert(`You scored ${response.data.score} out of ${response.data.total}!`);
      } catch (err) {
        console.error(err);
      }
    },

    // ...
  },
  };
  </script>
  