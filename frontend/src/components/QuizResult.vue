<template>
    <div class="quiz-result">
      <h2>Your Score</h2>
      <p>You got {{ score }} out of {{ total }} correct!</p>
      <button @click="$emit('back')">Back to list</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['score', 'total'],
  }
  </script>
  
  <style scoped>
.quiz-result {
  max-width: 300px;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

button {
  margin-top: 20px;
  background-color: #008CBA; /* Blue */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #007B9A; /* Darker blue */
}
</style>
