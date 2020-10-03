<template>
  <b-container fluid="sm">
    <div v-if="isLoading" class="is_loading">Loading Data!</div>
    <b-row v-else>
      <HomeGrids :props-data="filteredData" :items-per-row="3" />
    </b-row>
  </b-container>
</template>

<script>
import HomeGrids from '@/components/HomeGrids'
export default {
  name: 'Home',
  auth: false,
  components: {
    HomeGrids
  },
  data() {
    return {
      isLoading: true
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
      this.$store.dispatch('exams/getExamDataAction')
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
.is_loading {
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>
