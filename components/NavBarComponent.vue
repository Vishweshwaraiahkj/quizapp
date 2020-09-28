<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/"><Logo /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/todos">To-Dos</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="$auth.loggedIn">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <span>
                  {{ getUserName }}
                </span>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <div v-else class="ml-2">
            <b-btn href="/login" pill variant="outline-light">Login</b-btn>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: 'NavBarComponent',
  data() {
    return {}
  },
  computed: {
    getUserName() {
      let getUserName = 'Guest User'
      const uData = this.$store.state.users.userData
        ? this.$store.state.users.userData
        : undefined
      if (uData && uData.name) {
        console.log('User Data: ', this.$store.state.users.userData)
        getUserName = this.$store.state.users.userData.name
      } else if (uData && uData.firstName) {
        getUserName =
          uData.firstName && uData.lastName
            ? uData.firstName + ' ' + uData.lastName
            : uData.firstName
      }
      return getUserName
    }
  },
  methods: {
    logout() {
      console.log('Current user data: ', this.$auth.user)
      this.$auth.logout('local')
    }
  }
}
</script>
