<!-- frontend/src/components/Quiz.vue -->
<template>
    <div class="quiz">
      <div v-if="quiz && !quizFinished">
        <button @click="goBack">Back to list</button>
        <h1>{{ quiz.title }}</h1>
        <p>{{ quiz.description }}</p>
          <div v-for="question in questions" :key="question.question_id" class="question">
            <p>{{ question.question_text }}</p>
            <div v-for="option in question.options" :key="option.option_id" class="options">
    <label 
      :class="{ 'option-selected': answers[question.question_id] === option.option_id, option: true }" 
      @click="selectOption(question.question_id, option.option_id)"
    >
      <input 
        type="radio" 
        :name="question.question_id" 
        :value="option.option_id" 
        :checked="answers[question.question_id] === option.option_id"
      >
      {{ option.option_text }}
    </label>
  </div>
          </div>
          <button @click="submitQuiz">Submit</button>
      </div>
      <QuizResult v-else-if="quizFinished" :score="score" :total="total" @back="goBack" />
    </div>
</template>
  
  <script>
  import axios from 'axios';
  import QuizResult from './QuizResult.vue';

  export default {
    components: {
    QuizResult,
  },
    data() {
      return {
        quiz: null,
        questions: [],
        answers: {},
        quizFinished: false,    
      };
    },
    async created() {
      const response = await fetch(`http://localhost:3000/quiz/${this.$route.params.id}`);
      const data = await response.json();
      this.quiz = data.quiz;
      this.questions = data.questions;
    },
    methods: {
        goBack() {
        this.$router.push('/');
        },
        selectOption(questionId, optionId) {
            this.answers = { ...this.answers, [questionId]: optionId };
        },
        
        submitQuiz() {
      axios.post('http://localhost:3000/quiz/submit-quiz', {
        quizId: this.quiz.quiz_id,
        answers: this.answers,
      })
      .then(response => {
        this.score = response.data.score;
        this.total = response.data.total;
        this.quizFinished = true;
      })
      .catch(error => {
        console.error(error);
      });
    },

    // ...
  },
  };
  </script>
  
  <style scoped>
.quiz {
  margin: auto;
  text-align: center;
  border-radius: 5px;
  max-width: 800px;
  background-color: #333;
  color: #fff;
}

.question {
  margin-top: 20px;
  font-size: 20px;
}

.options {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.option {
  margin: 10px 0;
  background-color: #555;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
}

.option:hover {
  background-color: #666;
}

.option-selected,
.option-selected:hover {
  background-color: #4d3366;
}

input[type="radio"] {
  display: none;
}
</style>

  
