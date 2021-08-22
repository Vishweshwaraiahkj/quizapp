<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" class="customNavBar">
      <b-navbar-brand>
        <nuxt-link to="/"><Logo /></nuxt-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

<b-collapse id="nav-collapse" is-nav>
  <b-navbar-nav class="navbar-css">
        <b-nav-item >
          <nuxt-link to="/"> Home</nuxt-link> 
        </b-nav-item>
        <b-nav-item >
         <nuxt-link to="/mini-exam"> Mini Exams</nuxt-link> 
        </b-nav-item>
        <!--
        <b-nav-item >
          <nuxt-link to="/"> Previous Year Question Papers </nuxt-link> 
        </b-nav-item>
        -->
        <b-nav-item >
          <nuxt-link to="/videos"> Video Tutorials </nuxt-link> 
        </b-nav-item>  
         <b-nav-item >
           <nuxt-link to="/about"> About Us </nuxt-link> 
          </b-nav-item >
          <b-nav-item >  
           <nuxt-link to="/privacy-policy"> Privacy Policy </nuxt-link> 
          </b-nav-item >   
          <b-nav-item > 
           <nuxt-link to="/contact"> Contact Us </nuxt-link> 
        </b-nav-item>
 </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="$auth.loggedIn">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <span>
                  {{ getUserName }}
                </span>
              </template>
              <b-dropdown-item>
                <nuxt-link to="/user/profile">Profile</nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <div v-else class="ml-2">
            <b-btn pill variant="outline-light">
            <!--  <nuxt-link class="navbar-css" to="/login">Login</nuxt-link> -->
            </b-btn>
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
      const uData = this.$auth.$storage.getUniversal('USER_DATA')
        ? this.$auth.$storage.getUniversal('USER_DATA')
        : undefined
      if (uData && uData.name) {
        getUserName = this.$auth.$storage.getUniversal('USER_DATA')
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
      this.$auth.logout('local')
    }
  }
}
</script>
<style scoped>
.customNavBar {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12);
}

.navbar-css{
  font-weight: 600;
   font-size: 20px;
    
}

.navbar-css a {
color: #20ab20;
}
</style>
