<template>
  <b-container fluid="sm" class="p-3 singleQuestion">
    <h3 :id="'question_' + currentQuestion.qunId" class="question">
      {{ currentQuestion.qun }}
    </h3>
    <hr />
    <div
      v-for="(answer, key, index) in currentQuestion.options"
      :id="'answer_' + currentQuestion.qunId + '_' + key"
      :key="index"
      class="answers"
    >
      <label>{{ index + 1 }} ({{ key }}):</label>
      <span>{{ answer }}</span>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'SingleQuestion',
  props: {
    currentQuestion: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    isActive: true
  })
}
</script>

<style>
.singleQuestion {
  display: block;
  padding: 0 !important;
}
.question {
  border-radius: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid #e0e0e0;
  padding: 15px;
}
.answers {
  justify-content: flex-start;
  border-radius: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem;
  display: flex;
  flex: 1;
  margin-bottom: 0.625rem;
}
.answers label {
  padding: 0 1rem 0 0;
  margin-bottom: 0;
}
.answers span {
  width: auto;
}
</style>
