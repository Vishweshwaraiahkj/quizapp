<template>
  <div class="home-container">
    <div v-if="loadingImg"  class="loader"></div>
     <nuxt-link to="/mini-exam">
     <b-card v-if="! loadingImg" class="click-here">
          <span  class="footer_text">
          Click Here For Mini Mock Test
          <img src="/blue-arrow-png.png" width="20%" height="20">
        </span>
     </b-card>
     </nuxt-link>
    <div v-for="(section,index) in sections"> 
        <div class="my-title">
          <h2>{{section.title}}</h2>
        </div>
        <div class="box-stly">
          <b-card  v-for="data in section.dataObjs">
            <b-row>
              <b-col align-self="center">
               {{data.name}}
              </b-col>
              <b-col cols="2" align-self="center" @click="startExam(data)">
              <a class="button3">Start</a></b-col>
            </b-row>
          </b-card>
      
      <!--
           <b-card>
            <row>
              <a href="#"><span class="footer_text">Load More >>>></span></a>
            </row>
          </b-card>
      -->

        </div>
    </div> 

  </div>
</template>

<script>
export default {
  name: 'HomePageExamList',

  data: () => ({
      sections:[],
      loadingImg:true,
  }),

  methods: {

   isLoading(val){
       this.loadingImg=val;
    },

    startExam(data) {
     // this.$router.push('/exam/normal-exam')
     console.log(data);
       this.$ga.event({
          eventCategory: 'Full Exam',
          eventAction: 'Start Full Exam',
          eventLabel: data.name,
          eventValue: data.id
        })
      this.$router.push({path: '/exam/normal-exam', query : { examId: data.id}});
    },

    
  getHPD() {
      this.$axios.get('/appearance/1/hpd').then((response) => {
         this.sections=JSON.parse(response.data.content);
         this.isLoading(false);
        }).catch((e) => {
            alert("something went worng")
        })
    }

  },

  created() {
    this.getHPD();
  }
}
</script>
<style scoped>

.card-body {
  padding: 0 0.5rem;
  margin: 5px 5px;
}
.box-stly {
  font-weight: 400;
  font-size: 125%;
  color: #0a860a;
}

.col-2 {
  padding-left: 5px;
  padding-right: 5px;
}

a.button3 {
  display: inline-block;
  padding: 0.2em 0.40em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #fff;
  background-color: #4eb5f1;
  text-align: center;
  transition: all 0.2s;
  box-shadow: 0.1px 3px 5px #1b92d6;
}
a.button3:hover {
  background-color: #40c68e;
}

.col {
  padding-left: 10px;
  padding-right: 5px;
}

.footer_text {
  font-size: 110%;
  font-weight: 600;
  color: #2690d7;
  text-align: right;
  margin-left: 30px;
}

.home-container {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.home-container h2 {
  display: block;
  font-size: 1.2em;
  margin-top: 0.67em;
  margin-bottom: 0.67em;
  margin-left: 10px;
  margin-right: 0;
  font-weight: bold;
}
.card{
  margin-bottom: 8px;
  margin-left: 5px;
  margin-right: 5px;
  border: 1px outset limegreen;
}
.card:hover{
  background-color:lightblue;
}

.my-title{
  font: 1.5em sans-serif;
  color: #333;
  background: #FFF;
   text-shadow: 2px 2px 1px #FFF, 5px 4px 1px rgba(46, 45, 45, 0.15);  
}

.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  border-right: 16px solid #3498db;
  border-left: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin-left: 35%;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@media only screen and (min-width: 640px) {
   .click-here {
        display: none;
    }
  .card-body {
  padding: 0 1rem;
   margin: 1% 5%;
}
.card{
  margin-left: 6%;
   margin-right: 6%;
  border:1px;
  box-shadow:8px 7px 13px -2px rgba(0,0,0,0.75);
     -webkit-box-shadow: 8px 7px 13px -2px rgba(0,0,0,0.75);
      -moz-box-shadow: 8px 7px 13px -2px rgba(0,0,0,0.75);
}

.box-stly {
  font-weight: 400;
  font-size: 141%;
  color: #17a817;
}
  .home-container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-right: auto;
    margin-left: auto;
  }

  .footer_text {
    font-size: 17px;
    font-weight: 600;
    color: #d7263d;
  }
  .home-container h2 {
    font-size: 2rem;
  }
.loader {
  width: 170px;
  height: 170px;
}
  a.button3 {
  display: inline-block;
  padding:0.3em 1.2em; 
  margin:0 0.3em 0.3em 0;
  border-radius: 2em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #fff;
  background-color: #4eb5f1;
  text-align: center;
  transition: all 0.2s;
}

.my-title{
  margin-left:10%;
  margin-right: 10%;
  text-align: center;
  font: 2em sans-serif;
  color: #333;
  background: #FFF;
  text-shadow: 2px 2px 1px #FFF, 5px 4px 1px rgba(46, 45, 45, 0.15);  
}

}
</style>

