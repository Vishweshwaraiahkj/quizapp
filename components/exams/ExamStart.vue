<template>
  <b-container fluid="sm" class="ExamBoard">
    <div v-if="isLoading" class="is_loading">Loading Data!</div>
    <b-row v-else>
      <h1>{{ examData.name }}</h1>
      <div class="w-100">
        <pre>{{ examData }}</pre>
      </div>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'ExamStart',
  props: {
    examId: {
      type: Number,
      default: undefined
    }
  },
  data: () => ({}),
  computed: {
    examData() {
      const data = this.$store.state.exams.examFullData
        ? this.$store.state.exams.examFullData
        : {}

      return data.isAxiosError ? data.message : data
    },
    isLoading() {
      if (Object.keys(this.examData).length > 0) {
        return false
      } else {
        return true
      }
    }
  },
  created() {
    this.$store.dispatch('exams/getExamFullData', this.examId)
  }
}
</script>

<style>
.ExamBoard {
  display: block;
  border-radius: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid #e0e0e0;
  padding: 15px;
  margin: 2rem auto;
}

.ExamBoard .row {
  padding: 0 2rem;
}
</style>
