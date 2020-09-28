<template>
  <b-container class="mt-3">
    <LoginAuth />
  </b-container>
</template>

<script>
import LoginAuth from '@/components/user/loginAuth'
export default {
  name: 'Login',
  components: {
    LoginAuth
  }
}
</script>
