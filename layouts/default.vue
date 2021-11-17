<template>
  <div>
    <NavBarComponent v-if="$nuxt.$route.path !== '/login'" />
    <Nuxt />
    <CommentsBox />
    <b-row>
      <div class="w-100">
        <b-jumbotron header-level="5">
          <template #lead>
            You can get here all previous year karnataka police constable
            question papers from year 2020,2019,2018,2017
          </template>
          <p>
            We converted all previous year karnataka police constable question
            papers ar free mock test from year 2020,2019,2018,2017
          </p>
          <hr class="my-4" />
          <ul>
            <li>
              <h5>Karnataka Police Constable Exam Free Online Test Serises</h5>
            </li>
            <li><h5>Karnataka Police Constable Exam Free Mock Test</h5></li>
            <li><h5>Karnataka Police Constable old Question Papers</h5></li>
            <li>
              <h5>
                karnataka police constable previous year question mock test
              </h5>
            </li>
          </ul>
          <hr class="my-4" />
          <ul>
            <li>
              <h5>KSP Police Constable Exam Free Online Test Serises free</h5>
            </li>
            <li><h5>KSP Police Constable Exam Free Mock Test free</h5></li>
            <li><h5>KSP Police Constable old Question Papers free</h5></li>
            <li>
              <h5>
                KSP police constable previous year question mock test free
              </h5>
            </li>
          </ul>
        </b-jumbotron>
      </div>
    </b-row>
    <CommonFooter />
  </div>
</template>
<script>
import NavBarComponent from '@/components/global/NavBarComponent'
import CommonFooter from '@/components/global/CommonFooter'
import CommentsBox from '@/components/global/CommentsBox.vue'
export default {
  components: {
    NavBarComponent,
    CommonFooter,
    CommentsBox
  }
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
