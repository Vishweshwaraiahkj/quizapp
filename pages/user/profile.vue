<template>
  <b-container class="mt-3">
    <userProfile />
  </b-container>
</template>

<script>
import userProfile from '@/components/user/userProfile'
export default {
  name: 'Profile',
  components: {
    userProfile
  },
  validate() {
    return true
  }
}
</script>
