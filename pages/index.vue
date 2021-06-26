<template>
  <b-container fluid="sm" class="home_page">
    <div v-if="isLoading" class="is_loading">Loading Data!</div>
    <b-row v-else>
      <Carousel />
      <div class="mt-5">
        <h4>Take Exam Win Cash Prize</h4>
      </div>
      <HomeGrids :props-data="liveExams" :items-per-row="3" />

      <div class="w-100">
        <b-jumbotron header-level="5">
          <template #lead>
            You can get here all previous year karnataka police constable
            question papers from year 2020,2019,2018,2017
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
              <h5>
                karnataka police constable previous year question mock test
              </h5>
            </li>
          </ul>
          <hr class="my-4" />
          <ul>
            <li>
              <h5>KSP Police Constable Exam Free Online Test Serises free</h5>
            </li>
            <li><h5>KSP Police Constable Exam Free Mock Test free</h5></li>
            <li><h5>KSP Police Constable old Question Papers free</h5></li>
            <li>
              <h5>
                KSP police constable previous year question mock test free
              </h5>
            </li>
          </ul>
        </b-jumbotron>
      </div>
    </b-row>
  </b-container>
</template>

<script>
import HomeGrids from '@/components/HomeGrids'
import Carousel from '@/components/Carousel'
export default {
  name: 'Home',
  auth: false,
  components: {
    HomeGrids,
    Carousel
  },
  data() {
    return {
      isLoading: true,
      liveExams: []
    }
  },
  computed: {
    filteredData() {
      return this.$store.state.exams.examData
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$axios
        .get('/landing/live-exam')
        .then((response) => {
          this.isLoading = false
          this.liveExams = response.data
        })
        .catch((e) => {
          this.$errorHandler('server', e)
        })
    }
  }
}
</script>

<style scoped>
.home_page {
  display: block;
}
</style>
