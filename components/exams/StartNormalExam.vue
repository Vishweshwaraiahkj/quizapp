<template>
  <b-container fluid="sm" class="ExamBoard">
  <div v-if="isLoading">
    Exam is loading . . . 
   <div  class="loader"></div>
  </div>
  
   <div v-else>

      <div class="menuBox">
          <b-row>
              <b-col>  
                <h4> 
                    <b-badge v-show="index>0" @click="goToPrvQun" variant="primary">
                        &laquo;Prev
                    </b-badge>
                  </h4>
              </b-col>
                <b-col> 
                    <h4 style="color:blue"> {{index+1}}/{{totalQuestion}}</h4>
                  
                </b-col> 
                  <b-col>
                    <h4> 
                    <b-badge  v-show="(totalQuestion) > (index+1)" @click="goToNextQun" 
                        variant="primary">Next&raquo;</b-badge></h4> 
                    <b-button  @click="saveExamResult" v-show="(totalQuestion) == (index+1)"
                      variant="success">
                      Finish</b-button>      
                  </b-col>
          </b-row>
      </div>     

      <b-row  class="dataBox">
        <template v-if="currentQuestion">   
          <div class="w-100">
            <keep-alive>
              <SingleQuestion
                :key="currentQuestion.qunId"
                :current-question.sync="currentQuestion"
                @update-ans="updateAns"
              />
            </keep-alive>
          </div>
        </template>

        <template v-else>
          <h1>
            You are done with exam! Thank you :)
            {{ saveExamResult() }}
          </h1>
        </template>
        
      </b-row>

      <div class="menuBox">
          <b-row>
              <b-col>  
                <h4> 
                    <b-badge v-show="index>0" @click="goToPrvQun" variant="primary">
                        &laquo;Prev
                    </b-badge>
                  </h4>
              </b-col>
                <b-col> 
                        <button @click="saveExamResult"  class="dataBox row m-auto" >
                              <a class="button3 dataBox row m-auto">Finish</a>
                        </button>
                </b-col> 
                  <b-col>
                    <h4> 
                    <b-badge  v-show="(totalQuestion) > (index+1)" @click="goToNextQun" 
                        variant="primary">Next&raquo;</b-badge></h4> 
                    <b-button  @click="saveExamResult" v-show="(totalQuestion) == (index+1)"
                      variant="success">
                      Finish</b-button>      
                  </b-col>
          </b-row>
      </div> 

   </div>
   
  </b-container>
</template>

<script>
import SingleQuestion from '@/components/exams/SingleQuestion'

export default {
  name: 'StartNormalExam',
  components: {
    SingleQuestion,
  },
  props: {
    examId: {
      type: Number,
      default: undefined
    }
  },
  data: () => ({
    loadingImg:true,
    index: 0,
    ansArray: [],
    examMarks: 0,
    obtainedMarks: 0,
    percentage: 0,
    timerCount: 60,
    totalQuestion:0,
    examDataByApi:{},
  }),

  computed: {

    examData() {
      const data = this.examDataByApi ? this.examDataByApi : {}
      return data.isAxiosError ? false : data
    },

    isLoading() {
      if (Object.keys(this.examData).length > 0) {
        return false
      } else {
        return true
      }
    },
    
    currentQuestion() {
      const i = this.index
      if (this.examData && this.examData.sections)
        return this.examData.sections[0].questions[i]
    },

    questionsCount() {
      return this.examData.sections &&
        this.examData.sections[0].questions.length
        ? this.examData.sections[0].questions.length
        : 0
    },
  },

  created() {
    this.getExamByIdAndSetInstillValues(this.examId);
  },

  mounted() {
   // this.createAnsObject()
  },

  methods: {

        getExamByIdAndSetInstillValues(id) {
            this.$axios.get('exams/'+id)
                .then(res => {
                 this.examDataByApi=res.data;
                const questionLength=this.examDataByApi.sections[0].questions.length;
                this.totalQuestion=questionLength;
                this.createAnsObject(this.totalQuestion);
                })
                .catch((e) => {
                this.$errorHandler('server', e)
                })
            },

   goToPrvQun(){
       this.index = --this.index  
        },
        
     goToNextQun(){
           this.index = ++this.index
        },

    createAnsObject(totalQutions) {
      this.ansArray = Array(totalQutions).fill({
        qunId: '',
        ans: '',
        status: 0,
        time: ''
      })
    },

    updateAns(event, targetId) {
      const obj = { qunId: '', ans: '', status: 0, time: '' }
      const inx = this.index
      const id = targetId.split('_')
      obj.qunId = id[1]
      obj.ans = id[2]
      obj.status = 3
      this.ansArray[inx] = obj
    },

    saveExamResult() {
      const exam = this.examData
      if (!exam) return false
      this.$auth.$storage.setUniversal('ANS_STR', this.ansArray)
      this.$auth.$storage.setUniversal('EXAM_DATA', this.examData)
      this.$emit('go-to-normal-result-page')   
    },
  }
}
</script>

<style lang="scss">

.menuBox{
     font-weight: bold;
     font-size: 1rem;
     border: 2px solid #b4b1bd;;
     padding: -1px;
     box-shadow: 1px 2px;
     background-color:#e7edf3;
}

.ExamBoard {
  display: block;
  border-radius: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid #e0e0e0;
  padding: 0.3rem;
  margin: 0.2rem auto;

  .row {
    padding: 0 2rem;
  }

  a.button3 {
  display: inline-block;
  padding: 0.2em 0.40em;
  margin: 0 0.3em 0.3em 0;
  border-radius: 1em;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #fff;
  background-color: #149cc5;
  text-align: center;
  transition: all 0.2s;
}
a.button3:hover {
  background-color: #40c68e;
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

}

@media only screen and (max-width: 640px) {
  .ExamBoard .row {
    padding: 0 0.625rem;
  }
}

@media only screen and (min-width: 640px) {
    .ExamBoard {
         margin: 2rem auto;
    }

    .menuBox{
      box-shadow: 0.2px 0.2px;
    }

  a.button3 {
  display: inline-block;
  padding:0.5em 2em; 
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

.loader {
  width: 170px;
  height: 170px;
}
}
</style>
