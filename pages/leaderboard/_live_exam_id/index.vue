<template>
  <div>
    <b-card>
      <div class="d-flex justify-content-center">
        1 prizze
        <b-img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQixqjpXBp3M_ies5uGa1eyUfXYaydVgxlHwg&usqp=CAU"
          alt="Center image"
        ></b-img>
      </div>

      <div class="d-flex justify-content-around">
        <b-img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQixqjpXBp3M_ies5uGa1eyUfXYaydVgxlHwg&usqp=CAU"
          alt="Left image"
        ></b-img>
        <b-img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQixqjpXBp3M_ies5uGa1eyUfXYaydVgxlHwg&usqp=CAU"
          alt="Right image"
        ></b-img>
      </div>
    </b-card>
    <b-card class="text-center">
      <div v-if="isPublished">
        <b-table
          small
          :fields="fields"
          :items="leaderboard.leaders"
          responsive="sm"
        >
          <!-- A virtual column -->
          <template #cell(index)="data">
            {{ data.index + 1 }}
          </template>

          <!-- A custom formatted column -->
          <template #cell(name)="data">
            <b-img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQixqjpXBp3M_ies5uGa1eyUfXYaydVgxlHwg&usqp=CAU"
              width="70"
              height="70"
              rounded="circle"
              alt="Circle image"
            ></b-img>
            <b class="text-info">
              {{ data.item.firstName }} {{ data.item.lastName }}
            </b>
          </template>

          <template #cell(percentage)="data">
            <b class="text-info">{{ data.item.percentage }}%</b>
          </template>
        </b-table>
      </div>

      <div v-else>
        <b-card>
          <h4>Result not yat published. Try after some time</h4>
          <b-skeleton animation="throb" width="85%"></b-skeleton>
          <b-skeleton animation="throb" width="55%"></b-skeleton>
          <b-skeleton animation="throb" width="70%"></b-skeleton>
        </b-card>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Leaderboard',
  auth: false,
  components: {},

  data() {
    return {
      leaderboard: {},
      fields: [
        // A virtual column that doesn't exist in items
        'Rank',
        // A column that needs custom formatting
        { key: 'name', label: 'Full Name' },
        // A regular column
        { key: 'obtainedMarks', label: 'Marks' },
        // A regular column
        { key: 'percentage' }
      ],
      isPublished: false
    }
  },

  computed: {
    liveExamId() {
      console.log('liveExamId ID is: ', this.$route.params.live_exam_id)
      return this.$route.params.live_exam_id
    }
  },

  created() {
    this.getLeaderboardData(this.$route.params.live_exam_id)
  },

  methods: {
    async getLeaderboardData(liveExamId) {
      try {
        this.leaderboard = await this.$axios.$get(
          '/published/leaderboard/' + liveExamId
        )
        if (this.leaderboard.status == 2) {
          this.isPublished = true
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.examDetails {
  display: block;
  overflow-x: hidden;
  background: #f2f2f2;
  word-break: break-word;
}
</style>
