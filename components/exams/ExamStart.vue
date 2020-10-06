<template>
  <b-container fluid="sm" class="ExamBoard">
    <div v-if="isLoading" class="is_loading">Loading Data!</div>
    <b-row v-else class="dataBox">
      <h1>{{ examData.name }}</h1>
      <div class="w-100">
        <SingleQuestion
          v-if="currentQuestion"
          :current-question="currentQuestion"
        />
        <div v-else><h1>You are done with exam! Thank you :)</h1></div>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import SingleQuestion from '@/components/exams/SingleQuestion'
export default {
  name: 'ExamStart',
  components: {
    SingleQuestion
  },
  props: {
    examId: {
      type: Number,
      default: undefined
    }
  },
  data: () => ({
    index: 0
  }),
  computed: {
    examStartTime() {
      return this.getDateTime()
    },
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
    },
    currentQuestion() {
      const i = this.index
      if (this.examData && this.examData.sections)
        return this.examData.sections[0].questions[i]
      return {}
    }
  },
  created() {
    this.$store.dispatch('exams/getExamFullData', this.examId)
    const timer = () => {
      if (
        this.index ===
        (this.examData.sections && this.examData.sections[0].questions.length)
      ) {
        clearInterval(myVar)
      }
      const currentTime = this.getDateTime()
      if (
        // eslint-disable-next-line
        currentTime.data === currentTime.dat &&
        // eslint-disable-next-line
        currentTime.time === currentTime.time &&
        this.index <=
          (this.examData.sections && this.examData.sections[0].questions.length)
      ) {
        this.index = ++this.index
      }
    }
    const myVar = setInterval(timer, 60000)
  },
  methods: {
    getDateTime() {
      const today = new Date()
      const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate()
      const time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      return { dateTime, date, time }
    }
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
  padding: 1rem;
  margin: 2rem auto;
}

.ExamBoard .row {
  padding: 0 2rem;
}
</style>
