<template>
  <div class="countdown">
    <div class="block">
      <p v-if="days != 0" class="digit">{{ days | two_digits }} Days</p>
    </div>
    <div class="block">
      <p v-if="days != 0" class="digit">{{ hours | two_digits }} Hours</p>
    </div>
    <div class="block">
      <p class="digit">{{ minutes | two_digits }} Minutes</p>
    </div>
    <div class="block">
      <p class="digit">{{ seconds | two_digits }} Seconds</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountDown',

  filters: {
    two_digits(value) {
      if (value < 0) {
        return '00'
      }
      if (value.toString().length <= 1) {
        return `0${value}`
      }
      return value
    }
  },

  props: {
    date: {
      type: String,
      default: new Date()
    }
  },

  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000)
    }
  },

  computed: {
    dateInMilliseconds() {
      return Math.trunc(Date.parse(this.date) / 1000)
    },
    seconds() {
      return (this.dateInMilliseconds - this.now) % 60
    },
    minutes() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60
    },
    hours() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24
    },
    days() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24)
    }
  },

  mounted() {
    window.setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000)
    }, 1000)
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

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);

.countdown {
  display: flex;
}

.text {
  color: #dce4e2;
  font-size: 15px;
  font-family: 'Roboto Condensed', serif;
  font-weight: 20;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}

.digit {
  color: #634de0;
  font-size: 20px;
  font-weight: 900;
  font-family: 'Roboto', serif;
  margin: 2px;
  text-align: center;
}
</style>
