<template>
  <div class="examStarted">
     <StartNormalExam :exam-id="parseInt(examId)" @go-to-normal-result-page="goToNormalResultPage()" />
  </div>
</template>

<script>
import StartNormalExam from '@/components/exams/StartNormalExam'
export default {
  name: 'NormalExam',
  auth: false,
  components: {
    StartNormalExam
  },

  data: () => ({
   examId:0,
  }),

  methods: {

    goToNormalResultPage() {
      this.$router.push('/exam/normal-exam/result');
      this.nextUrl()
    }
  },

 created() {
  this.examId=this.$route.query.examId;
  },
}
</script>

<style>
.examStarted {
  display: block;
  overflow-x: hidden;
  word-break: break-word;
}
.popupDesign {
  padding: 2rem;
}
.no_radius {
  border-radius: 0;
}
</style>
