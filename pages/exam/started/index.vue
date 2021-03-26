<template>
  <div class="examStarted">
    <ExamStart :exam-id="examId" @go-to-result-page="goToResultPage()" />
    <div>
      <b-modal
        v-model="openedModal"
        no-close-on-esc
        no-close-on-backdrop
        no-fade
        no-stacking
        hide-header
        hide-footer
        hide-header-close
        body-class="popupDesign"
        content-class="no_radius"
      >
        <h3>
          If you go away from this page, you will loose your exam's progress!.
          Please stay here to continue with exam.
        </h3>
        <b-btn pill variant="primary" @click="stayHere()">Yes, Stay here</b-btn>
        <b-btn pill variant="light" @click="goAway()">It's Okay, Go Away</b-btn>
      </b-modal>
    </div>
  </div>
</template>

<script>
import ExamStart from '@/components/exams/ExamStart'
export default {
  name: 'StartExam',
  auth: true,

  components: {
    ExamStart
  },
  beforeRouteLeave(to, from, next) {
    if (this.isGoTogoToResultPage) {
      this.openedModal = false
    } else {
      this.openedModal = true
    }
    this.nextUrl = next
  },
  data: () => ({
    leavePage: false,
    openedModal: false,
    isGoTogoToResultPage: false,
    nextUrl: () => {}
  }),

  computed: {
    examId() {
      const RealExamID = this.$store.state.exams.realExamId

      return Number(RealExamID)
    },

    liveExamId() {
      const LiveExamID = this.$store.state.exams.liveExamId
      return Number(LiveExamID)
    }
  },
  beforeMount() {
    window.addEventListener('beforeunload', this.preventNav)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('beforeunload', this.preventNav)
    })
  },
  methods: {
    preventNav(event) {
      if (this.leavePage) return
      event.preventDefault()
      event.returnValue = ''
    },
    goAway() {
      // code to next route
      this.leavePage = true
      this.openedModal = !this.openedModal
      this.nextUrl()
    },
    stayHere() {
      // Hide the modal manually
      window.history.forward(1)
      this.leavePage = false
      this.openedModal = !this.openedModal
    },

    goToResultPage() {
      this.isGoTogoToResultPage = true
      this.leavePage = true
      this.$router.push('/exam/result/' + 'LE_LIVE_' + this.liveExamId)
      this.nextUrl()
    }
  }
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
