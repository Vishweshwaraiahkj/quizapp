<template>
  <b-container fluid="sm" class="ExamBoard">
    <div v-if="isLoading" class="is_loading">Loading Data!</div>
    <b-row v-else class="dataBox">
      <div class="d-flex align-items-right  w-100">
        <Timer v-if="deadline" :deadline="deadline" :speed="1000" />
        <b-progress-bar :value="timerCount" max="80" show-progress animated>
        <span>{{timerCount}} Seconds Left</span>
      </b-progress-bar>
      </div>
      <div class="w-100">
        <SingleQuestion v-if="currentQuestion" :current-question="currentQuestion" @update-ans="updateAns"/>
        <div v-else>
			<h1>
				You are done with exam! Thank you :)
        {{saveExamResult()}}
			</h1>
		</div>
      </div>
    </b-row>
<button @click="saveExamResult"> test</button>
  </b-container>
</template>

<script>
import SingleQuestion from '@/components/exams/SingleQuestion'
import Timer from '@/components/global/Timer'

export default {
  name: 'ExamStart',  
  
  components: {
    SingleQuestion,
    Timer
  },
  
  props: {
    examId: {
      type: Number,
      default: undefined
    },
    
  },
  
  data: () => ({
    index: 0,
  	ansArray:[],
	  examMarks: 0,
    obtainedMarks: 0,
    percentage: 0,
    timerCount: 60,
  }),
  
  computed: {
    examStartTime() {
      return this.getDateTime()
    },
    examData() {
      const data = this.$store.state.exams.examFullData
        ? this.$store.state.exams.examFullData: {}
      return data.isAxiosError ? data.message : data
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
      return {}
    },
	
    questionsCount() {
      return this.examData.sections &&
        this.examData.sections[0].questions.length
        ? this.examData.sections[0].questions.length
        : 0
    },
    
    deadline() {
      let deadline = 0
      if (this.questionsCount) {
        const dateNow = Date.now() + this.questionsCount * 60 * 1000
        const today = new Date(dateNow)
        const month = today.getMonth() + 1
        const day = today.getDate()
        const fullYear = today.getFullYear()
        const hours = today.getHours()
        const minutes = today.getMinutes()
        const seconds = today.getSeconds()
        deadline =
          month +
          '/' +
          day +
          '/' +
          fullYear +
          ' ' +
          hours +
          ':' +
          minutes +
          ':' +
          seconds
      }
      return deadline
    }
  },
  
  
  methods: {
  
    getDateTime() {
      const today = new Date()
      const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate()
      const time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      return { dateTime, date, time }
    },
	
	createAnsObject(){
	 var totalQutions = 10;
      //for (var i = 0; i < this.exam.sections.length; i++) {
      // totalQutions = totalQutions + this.exam.sections[i].totalQuestion;}

      this.ansArray = Array(totalQutions).fill({
        qunId: "",
        ans: "",
        status: 0,
        time: ""
      });
	},
	
	 updateAns(event,targetId){

	  var obj={qunId: "", ans: "", status: 0,time: ""}
            var inx=this.index;
			var id = targetId.split("_");
			console.log(targetId);
			obj.qunId=id[1];
			obj.ans=id[2];
			obj.status=3;
			 this.ansArray[inx]=obj;
   },
   
    getAns: function(ansIndex) {
      if (ansIndex == 0) {
        return "opt1";
      } else if (ansIndex == 1) {
        return "opt2";
      } else if (ansIndex == 2) {
        return "opt3";
      }
      if (ansIndex == 3) {
        return "opt4";
      }
    },
	
     calculateResult(exam){
      var correctAnswer = 0;
      var notAttempted = 0;
      var notAnswered = 0;
     var totalQun = this.ansArray.length;
      var ansIndx = 0;
      var totalMarks = 0;
      var wrongAnswer = 0;
      var negativeMarks = 0;
      var examMarks = 0;
	  
      for (var i = 0; i < exam.sections.length; i++) {
        var section = exam.sections[i];
        examMarks = examMarks + section.markPerQution * section.totalQuestion;
        for (var j = 0; j < section.totalQuestion; j++) {
          var question = section.questions[j];
          var ansObj = this.ansArray[ansIndx];
          //console.log(ansObj);
          if (ansObj.status == 0) {
            notAttempted++;
          } else {
            if (ansObj.status == 1) {
              notAnswered++;
            } else if (ansObj.status == 3) {
              if (ansObj.ans == this.getAns(question.ans)) {
                correctAnswer++;
                totalMarks = totalMarks + section.markPerQution;
              } else {
                wrongAnswer++;
              }
            }
          }
          ansIndx++;
        }
        negativeMarks =
          negativeMarks + section.negativeMarkPerQun * wrongAnswer;
      }

      this.correctAnswer = correctAnswer;
      this.notAttempted = notAttempted;
      this.notAnswered = notAnswered;
      this.totalMarks = totalMarks;
      this.wrongAnswer = wrongAnswer;
      this.negativeMarks = negativeMarks;

      this.examMarks = examMarks;
      this.obtainedMarks = this.totalMarks - this.negativeMarks;
      this.percentage = (this.obtainedMarks * 100) / this.examMarks;
	  
	  console.log(" this.obtainedMarks:"+this.obtainedMarks+" this.percentage: "+this.percentage)
    },

       getToken(){
             	var token= this.$auth.getToken('local');  
               token=token.replace("Bearer ", "");
               return token;
    },
	
	 saveExamResult() {
     var liveExamId;
     var uData;
     if(process.browser){
        liveExamId =this.$auth.$storage.getUniversal('Live_Exam_Info_Object').liveExamInfoId;
         uData = this.$auth.$storage.getUniversal('USER_DATA');
     }
  
	  var exam =this.examData
      this.calculateResult(exam);

      var er = new Object();
      er.ansObj = this.ansArray;
      er.status = "completed";
      er.examId = exam.examId;
      er.liveExamId=liveExamId;
      er.totalMarks = this.examMarks;
      er.obtainedMarks = this.obtainedMarks;
      er.percentage = this.percentage;
		this.$axios(
        { method: 'post',url: '/user/live-exam-results?access_token='+this.getToken(), data: er,
        headers: {'content-type': 'application/json','user':uData.userId}
			}).then(response => {
              this.$auth.$storage.setUniversal('ANS_STR', this.ansArray)
               this.$auth.$storage.setUniversal('EXAM_DATA', this.examData)
          	   this.$emit('go-to-result-page');
        }) .catch(e => {
          alert("something went worng.....exam is not saved");
          this.$router.push("/pages/500");
          console.log(e);
        });
    },
  },
  
  created() {
  
    this.$store.dispatch('exams/getExamFullData', this.examId)
  
  const timer = () => {
      if (
        this.index ===
        (this.examData.sections && this.examData.sections[0].questions.length)
      ) {
        clearInterval(myVar)
      }
      const currentTime = this.getDateTime()
      if (
        // eslint-disable-next-line
        currentTime.data === currentTime.dat &&
        // eslint-disable-next-line
        currentTime.time === currentTime.time &&
        this.index <=
          (this.examData.sections && this.examData.sections[0].questions.length)
      ) {
        this.index = ++this.index
      }
    }
    const myVar = setInterval(timer, 60000)	
  },
  
  mounted() {
  this.createAnsObject();
  },

     watch: {
            timerCount: {
                handler(value) {
                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }else{
                      this.timerCount=60;
                    }
                },
                immediate: true // This ensures the watcher is triggered upon creation
        }
     }
}
</script>

<style>
.ExamBoard {
  display: block;
  border-radius: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem;
  margin: 2rem auto;
}

.ExamBoard .row {
  padding: 0 2rem;
}
</style>
