<template>
  <ExamDetails class="examDetails" :exam-id="examId" />
</template>

<script>
import ExamDetails from '@/components/examDetails'
export default {
  name: 'Details',
  auth: false,
  components: {
    ExamDetails
  },
  computed: {
    examId() {
      console.log('Exam ID is: ', this.$route.params.exam_id)
      return this.$route.params.exam_id
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
