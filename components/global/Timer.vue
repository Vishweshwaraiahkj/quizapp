<template>
  <div>
    <div v-if="currentTime" class="text-center">
      <span v-if="days">{{ days }} Days</span>
      <span v-if="hours">{{ hours | formatTime }} Hours</span>
      <span v-if="minutes">{{ minutes | formatTime }} Minutes</span>
      <span v-if="seconds">{{ seconds | formatTime }} Seconds</span>
    </div>
    <div v-if="!currentTime" class="text-center">Time's Up!</div>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  filters: {
    formatTime(value) {
      if (value < 10) {
        return '0' + value
      }
      return value
    }
  },
  props: {
    deadline: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      currentTime: Date.parse(this.deadline) - Date.parse(new Date())
    }
  },
  computed: {
    seconds() {
      return Math.floor((this.currentTime / 1000) % 60)
    },
    minutes() {
      return Math.floor((this.currentTime / 1000 / 60) % 60)
    },
    hours() {
      return Math.floor((this.currentTime / (1000 * 60 * 60)) % 24)
    },
    days() {
      return Math.floor(this.currentTime / (1000 * 60 * 60 * 24))
    }
  },
  mounted() {
    setTimeout(this.countdown, 1000)
  },
  methods: {
    countdown() {
      this.currentTime = Date.parse(this.deadline) - Date.parse(new Date())
      if (this.currentTime > 0) {
        setTimeout(this.countdown, this.speed)
      } else {
        this.currentTime = null
      }
    }
  }
}
</script>
