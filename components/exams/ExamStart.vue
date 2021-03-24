<template>
  <b-container fluid="sm" class="ExamBoard">
    <div v-if="isLoading" class="is_loading">Loading Data!</div>
    <b-row v-else class="dataBox">
      <div class="d-flex align-items-right custom-progress-bar">
        <Timer v-if="deadline" :deadline="deadline" :speed="1000" />
        <b-progress-bar :value="timerCount" max="80" show-progress animated>
          <span>{{ timerCount }} Seconds Left</span>
        </b-progress-bar>
      </div>
      <div class="w-100">
        <keep-alive>
          <SingleQuestion
            v-if="currentQuestion"
            :key="currentQuestion.qunId"
            :current-question.sync="currentQuestion"
            @update-ans="updateAns"
          />
          <div v-else>
            <h1>
              You are done with exam! Thank you :)
              {{ saveExamResult() }}
            </h1>
          </div>
        </keep-alive>
      </div>
    </b-row>
    <button @click="saveExamResult">test</button>
  </b-container>
</template>

<script>
import SingleQuestion from '@/components/exams/SingleQuestion'
import Timer from '@/components/global/Timer'

export default {
  name: 'ExamStart',

  components: {
    SingleQuestion,
    Timer
  },

  props: {
    examId: {
      type: Number,
      default: undefined
    }
  },

  data: () => ({
    index: 0,
    ansArray: [],
    examMarks: 0,
    obtainedMarks: 0,
    percentage: 0,
    timerCount: 60
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
    },

    questionsCount() {
      return this.examData.sections &&
        this.examData.sections[0].questions.length
        ? this.examData.sections[0].questions.length
        : 0
    },

    deadline() {
      let deadline = 0
      if (this.questionsCount) {
        const dateNow = Date.now() + this.questionsCount * 60 * 1000
        const today = new Date(dateNow)
        const month = today.getMonth() + 1
        const day = today.getDate()
        const fullYear = today.getFullYear()
        const hours = today.getHours()
        const minutes = today.getMinutes()
        const seconds = today.getSeconds()
        deadline =
          month +
          '/' +
          day +
          '/' +
          fullYear +
          ' ' +
          hours +
          ':' +
          minutes +
          ':' +
          seconds
      }
      return deadline
    }
  },

  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--
          }, 1000)
        } else {
          this.timerCount = 60
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  },

  created() {
    this.$store.dispatch('exams/getExamFullData', this.examId)

    const timer = () => {
      if (this.index === this.examData?.sections[0]?.questions?.length) {
        clearInterval(myVar)
      }
      if (this.index <= this.examData?.sections[0]?.questions?.length) {
        this.index = ++this.index
      }
    }
    const myVar = setInterval(timer, 60000)
  },

  mounted() {
    this.createAnsObject()
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
    },

    createAnsObject() {
      const totalQutions = 10
      // for (var i = 0; i < this.exam.sections.length; i++) {
      // totalQutions = totalQutions + this.exam.sections[i].totalQuestion;}

      this.ansArray = Array(totalQutions).fill({
        qunId: '',
        ans: '',
        status: 0,
        time: ''
      })
    },

    updateAns(event, targetId) {
      const obj = { qunId: '', ans: '', status: 0, time: '' }
      const inx = this.index
      const id = targetId.split('_')
      obj.qunId = id[1]
      obj.ans = id[2]
      obj.status = 3
      this.ansArray[inx] = obj
    },

    getAns(ansIndex) {
      if (ansIndex === 0) {
        return 'opt1'
      } else if (ansIndex === 1) {
        return 'opt2'
      } else if (ansIndex === 2) {
        return 'opt3'
      }
      if (ansIndex === 3) {
        return 'opt4'
      }
    },

    calculateResult(exam) {
      const totalQun = this.ansArray.length
      let correctAnswer = 0
      let notAttempted = 0
      let notAnswered = 0
      let ansIndx = 0
      let totalMarks = 0
      let wrongAnswer = 0
      let negativeMarks = 0
      let examMarks = 0

      for (let i = 0; i < exam.sections.length; i++) {
        const section = exam.sections[i]
        examMarks = examMarks + section.markPerQution * section.totalQuestion
        for (let j = 0; j < section.totalQuestion; j++) {
          const question = section.questions[j]
          const ansObj = this.ansArray[ansIndx]
          if (ansObj.status === 0) {
            notAttempted++
          } else if (ansObj.status === 1) {
            notAnswered++
          } else if (ansObj.status === 3) {
            if (ansObj.ans === this.getAns(question.ans)) {
              correctAnswer++
              totalMarks = totalMarks + section.markPerQution
            } else {
              wrongAnswer++
            }
          }
          ansIndx++
        }
        negativeMarks = negativeMarks + section.negativeMarkPerQun * wrongAnswer
      }

      this.correctAnswer = correctAnswer
      this.notAttempted = notAttempted
      this.notAnswered = notAnswered
      this.totalMarks = totalMarks
      this.wrongAnswer = wrongAnswer
      this.negativeMarks = negativeMarks

      this.examMarks = examMarks
      this.obtainedMarks = this.totalMarks - this.negativeMarks
      this.percentage = (this.obtainedMarks * 100) / this.examMarks

      console.log(
        ' this.obtainedMarks:' +
          this.obtainedMarks +
          ' this.percentage: ' +
          this.percentage
      )
    },

    getToken() {
      let token = this.$auth.getToken('local')
      token = token.replace('Bearer ', '')
      return token
    },

    saveExamResult() {
      let liveExamId
      let uData
      if (process.browser) {
        liveExamId = this.$auth.$storage.getUniversal('Live_Exam_Info_Object')
          .liveExamInfoId
        uData = this.$auth.$storage.getUniversal('USER_DATA')
      }

      const exam = this.examData
      this.calculateResult(exam)

      const er = {}
      er.ansObj = this.ansArray
      er.status = 'completed'
      er.examId = exam.examId
      er.liveExamId = liveExamId
      er.totalMarks = this.examMarks
      er.obtainedMarks = this.obtainedMarks
      er.percentage = this.percentage

      this.$axios({
        method: 'post',
        url: '/user/live-exam-results?access_token=' + this.getToken(),
        data: er,
        headers: { 'content-type': 'application/json', user: uData.userId }
      })
        .then((response) => {
          this.$auth.$storage.setUniversal('ANS_STR', this.ansArray)
          this.$auth.$storage.setUniversal('EXAM_DATA', this.examData)
          this.$emit('go-to-result-page')
        })
        .catch((e) => {
          this.$router.push('/errors/500')
        })
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

.custom-progress-bar {
  width: 100%;
  margin: 1rem 0;
  background: #fdeeee;
  padding: 0.5rem;
}

.custom-progress-bar > div:first-child {
  padding-right: 0.625rem;
}

@media only screen and (max-width: 640px) {
  .ExamBoard .row {
    padding: 0 0.625rem;
  }
}
</style>
