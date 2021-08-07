<template>
  <b-container fluid="sm" class="home_page">
     <!--
    <div v-if="isLoading" class="is_loading">Loading Data!</div>
    -->
    <b-row >
      <!--
      <div class="mt-5">
        <h4>Take Exam Win Cash Prize</h4> 
      </div>
       <HomeGrids :props-data="liveExams" :items-per-row="3" /> 
     -->
         <HomePageExamList/> 

    

    </b-row>
  </b-container>
</template>

<script>
import HomeGrids from '@/components/HomeGrids'
import HomePageExamList from '@/components/exams/HomePageExamList'
export default {
  name: 'Home',
  auth: false,
  components: {
    HomeGrids,
    HomePageExamList
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
    //this code is needed
   // this.getData()
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
