<template>
  <b-container fluid="sm" class="home_page">
    
    <b-row >
         <MiniExamListComp/> 
    </b-row>
  </b-container>
</template>

<script>
import MiniExamListComp from '@/components/exams/MiniExamListComp'
export default {
  name: 'Home',
  auth: false,
  components: {
    MiniExamListComp
  },

  data() {
    return {
    }
  },
  computed: {
    filteredData() {
      return this.$store.state.exams.examData
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped>
.home_page {
  display: block;
}
</style>
