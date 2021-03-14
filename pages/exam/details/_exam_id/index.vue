<template>
  <ExamDetails class="examDetails" :live-exam-id="liveExamId" />
</template>

<script>
import ExamDetails from '@/components/exams/ExamDetails'
export default {
  name: 'Details',
  auth: false,
  components: {
    ExamDetails
  },
  computed: {
    liveExamId() {
      const liveExamId = this.$route.params.exam_id
      this.$store.dispatch('exams/setLiveExamId', liveExamId)
      console.log('Live exam id is: ', liveExamId)
      return liveExamId
    }
  }
}
</script>

<style>
.examDetails {
  display: block;
  overflow-x: hidden;
  background: #f2f2f2;
  word-break: break-word;
}
</style>
