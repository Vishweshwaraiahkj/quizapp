<template>
  <div>
    <div
      :id="getExamDetails.realExamId"
      class="details_banner"
      :style="{ backgroundImage: 'url(' + getExamDetails.examBgImageLoc + ')' }"
    >
      <b-container fluid="sm" class="py-3">
        <div class="d-flex align-items-center">
          <div class="company_logo">
            <b-img
              class="b-lazy b-loaded"
              :src="getExamDetails.examIconLoc"
              alt="Exam Logo"
            />
          </div>
          <div class="banner_details">
            <h1>{{ getExamDetails.examName }}</h1>
            <h3>{{ getExamDetails.examDate }}</h3>
          </div>
        </div>
      </b-container>
    </div>
    <b-container fluid="sm" class="mt-5">
      <div class="question_brief">
        <h3>{{ getExamDetails.examName }}</h3>
        <div class="question_details">
          <div class="d-flex align-items-center">
            <span>Questions</span>
            <span>{{ getExamDetails.totalNoOfQues }}</span>
          </div>
          <div class="d-flex align-items-center">
            <span>Time</span>
            <span>{{ getExamDetails.examDuration }} Mins</span>
            <span v-if="upcomingExam" class="mr-auto">
              <b-btn pill variant="primary">
                <nuxt-link to="/exam/started" class="white_anchor">
                  Start now
                </nuxt-link>
              </b-btn>
            </span>
          </div>
          <div class="d-flex align-items-center">
            <span>Max Score</span>
            <span>{{ getExamDetails.maxScore }}</span>
          </div>
        </div>
      </div>
      <div class="question_desc">
        <!-- eslint-disable-next-line -->
        <div v-html="getExamDetails.descHtml"></div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'ExamDetails',
  props: {
    examId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      upcomingExam: true
    }
  },
  computed: {
    getExamDetails() {
      return this.$store.state.exams.currentExamDetails
    }
  },
  created() {
    this.$store.dispatch('exams/getExamDetailsByExamId', this.examId)
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
