<template>
  <b-container>
    <div>
      <b-jumbotron header-level="5">
        <template #header>MyExamAim</template>

        <template #lead>
          You can get here all previous year karnataka police constable question
          papers from year 2020,2019,2018,2017
        </template>
        <p>
          We converted all previous year karnataka police constable question
          papers ar free mock test from year 2020,2019,2018,2017
        </p>
        <hr class="my-4" />
        <ul>
          <li>
            <h5>Karnataka Police Constable Exam Free Online Test Serises</h5>
          </li>
          <li><h5>Karnataka Police Constable Exam Free Mock Test</h5></li>
          <li><h5>Karnataka Police Constable old Question Papers</h5></li>
          <li>
            <h5>karnataka police constable previous year question mock test</h5>
          </li>
        </ul>
      </b-jumbotron>
    </div>
    <div>
      <b-card>
        <b-row>
          <h4>Your Recent Live Exams</h4>
        </b-row>
        <b-row>
          <div>
            <b-card-group deck>
              <div v-for="item in completedLiveExams" :key="item.id">
                <b-card
                  :title="item.examName"
                  img-src="https://picsum.photos/600/300/?image=25"
                  img-alt="Image"
                  img-top
                  style="max-width: 21rem"
                  class="mb-2"
                >
                  <b-button variant="primary" @click="goToResultPage(item)">
                    Go To Result
                  </b-button>
                </b-card>
              </div>
            </b-card-group>
          </div>
        </b-row>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import userProfile from '@/components/user/userProfile'
export default {
  name: 'Dashboard',
  components: {},

  data() {
    return {
      completedLiveExams: [],
      liveExamId: 0
    }
  },

  mounted() {
    const uData = this.$auth.$storage.getUniversal('USER_DATA')
    this.getCompeletedLiveExam(uData.userId)
  },

  methods: {
    getCompeletedLiveExam(userId) {
      this.$axios
        .get('/liveexaminfo/compeleted-live-exam/0/10', {
          headers: { user: userId }
        })
        .then((response) => {
          this.completedLiveExams = response.data
        })
        .catch((e) => {
          this.$errorHandler('server', e)
        })
    },

    goToResultPage(item) {
      const liveExamObject = {}
      liveExamObject.liveExamInfoId = item.liveExamId
      liveExamObject.realExamId = item.realExamId
      liveExamObject.examName = item.examName
      liveExamObject.examDate = item.examDate
      liveExamObject.examResultTime = item.exam_result_time

      this.$auth.$storage.setUniversal('Live_Exam_Info_Object', liveExamObject)

      this.$router.push('/exam/result/LE_REVIEW_' + item.liveExamId)
    }
  }
}
</script>
