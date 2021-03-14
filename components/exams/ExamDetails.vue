<template>
  <div>
    <b-modal id="login-modal" ref="login-modal">
      <b-container class="mt-3">
        <LoginAuth end-url="exam/started" />
      </b-container>
    </b-modal>

    <div
      :id="liveExamInfo.id"
      class="details_banner"
      :style="{ backgroundImage: 'url(' + liveExamInfo.examBgImageLoc + ')' }"
    >
      <b-container fluid="sm" class="py-3">
        <div class="d-flex align-items-center">
          <div class="company_logo">
            <b-img
              class="b-lazy b-loaded"
              :src="liveExamInfo.examIconLoc"
              alt="Exam Logo"
            />
          </div>
          <div class="banner_details">
            <h1>{{ liveExamInfo.examName }}</h1>
            <h3></h3>
          </div>
        </div>
      </b-container>
    </div>

    <b-container fluid="sm" class="mt-5">
      <div class="question_brief">
        <h3>{{ liveExamInfo.examName }}</h3>
        <div class="question_details">
          <div class="d-flex align-items-center">
            <span>Exam Date</span>
            <span>{{ liveExamInfo.examDate }}</span>
            <h4>
              <span style="width: 30%; background-color: #dce4e2">
                <CountDown
                  :date="
                    liveExamInfo.examDate + ' ' + liveExamInfo.examStartTime
                  "
                />
              </span>
            </h4>
          </div>
          <div class="d-flex align-items-center">
            <span>Questions</span>
            <span>{{ liveExamInfo.totalNoOfQues }}</span>
          </div>
          <div class="d-flex align-items-center">
            <span>Time</span>
            <span>{{ liveExamInfo.examDuration }} Mins</span>
            <span v-if="upcomingExam" class="mr-auto">
              <b-btn
                pill
                variant="primary"
                class="white_anchor"
                @click="startNow"
              >
                Start now
              </b-btn>
            </span>
          </div>
          <div class="d-flex align-items-center">
            <span>Max Score</span>
            <span>{{ liveExamInfo.maxScore }}</span>
          </div>
        </div>
      </div>
      <div class="question_desc">
        <!-- eslint-disable-next-line -->
        <div v-html="liveExamInfo.examDesc"></div>
      </div>
    </b-container>
    <div></div>
  </div>
</template>

<script>
import CountDown from '@/components/global/CountDown'

export default {
  name: 'ExamDetails',
  props: {
    liveExamId: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      upcomingExam: true,
      liveExamInfo: {}
    }
  },

  computed: {
    CountDown
  },
  created() {
    this.getLiveExamInfoById(this.liveExamId)
  },
  methods: {
    startNow() {
      if (this.$auth.loggedIn) {
        this.$router.push('/exam/started')
      } else {
        this.$refs['login-modal'].show()
      }
    },

    getLiveExamInfoById(id) {
      this.$axios
        .get('/public/liveExamiInfo/' + id)
        .then((response) => {
          this.liveExamInfo = response.data
          this.$store.dispatch(
            'exams/setRealExamId',
            this.liveExamInfo.realExamId
          )

          const liveExamObject = {}
          liveExamObject.liveExamInfoId = this.liveExamInfo.id
          liveExamObject.realExamId = this.liveExamInfo.realExamId
          liveExamObject.examName = this.liveExamInfo.examName
          liveExamObject.examDate = this.liveExamInfo.examDate
          liveExamObject.examResultTime = this.liveExamInfo.examResultTime

          this.$auth.$storage.setUniversal(
            'Live_Exam_Info_Object',
            liveExamObject
          )
        })
        .catch((e) => {})
    }
  }
}
</script>

<style>
.details_banner {
  background-size: cover;
  background-color: rgba(45, 24, 70, 1);
  position: relative;
  background-position: center center;
  opacity: 0.75;
}
.company_logo {
  float: left;
  width: 120px;
  height: 120px;
  line-height: 104px;
  margin-right: 1rem;
}
.company_logo img {
  position: relative;
  width: 100%;
  background-color: #fff;
  padding: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  margin-right: 16px;
}
.banner_details {
  color: #fff;
  flex: 1;
}
.banner_details h1,
.banner_details h3 {
  background: rgb(0 0 0 / 68%);
  border-radius: 5px;
  padding: 0 0.75rem;
  display: inline-block;
}
.question_brief,
.question_desc {
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding: 15px;
}
.question_details .d-flex span {
  width: 10%;
  padding: 0.25rem 0;
}
.question_details .d-flex span:first-child {
  color: #8a858d;
}
.challenge-prizes ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.question_desc a {
  color: #d7263d;
  text-decoration: none;
  line-height: inherit;
  font-weight: 500;
  margin-bottom: 1rem;
  display: block;
  margin-top: 1rem;
  font-size: 1rem;
}
li.clearfix {
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
}
li.clearfix .details {
  margin-left: 1rem;
}
</style>
