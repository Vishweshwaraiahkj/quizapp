<template>
  <b-container fluid="sm" class="p-3 singleQuestion">
    <h4 :id="'question_' + currentQuestion.qunId" class="question">
      {{ currentQuestion.qun }} 
    </h4>
    <hr />
    <b-list-group>
      <b-list-group-item class="answers"
        v-for="(answer, key, index) in currentQuestion.options"
        :id="'answer_' + currentQuestion.qunId + '_' + key" :key="index"  @click="sendAns($event)">
		
        <b-form-radio v-model="selected" name="some-radios" :value="key">
          <span>{{ answer }}</span> 
        </b-form-radio>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
export default {
  name: 'SingleQuestion',
  props: {
    currentQuestion: {
      type: Object,
      default: () => ({})
    },
	
  },
  data: () => ({
    isActive: true,
    selected: undefined
  }),
  
   methods: {
   
  sendAns(event){
	var  targetId = event.currentTarget.id;
	this.$emit('update-ans',event, targetId);
  }
   },
   
   mounted() {
	this.selected=undefined;
   }
}
</script>

<style>
.singleQuestion {
  display: block;
  padding: 0 !important;
}
.question {
  border-radius: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid #e0e0e0;
  padding: 15px;
}
.answers {
  border-radius: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  border-bottom: 1px solid #e0e0e0;
  padding: 0.75rem;
  display: list-item;
  margin-bottom: 0.625rem;
  list-style: upper-alpha;
  list-style-position: inside;
}
.answers:hover {
  background: cornflowerblue;
}
.answers .custom-radio {
  display: inline-flex;
}
.answers label {
  display: flex;
  align-items: center;
}
.answers span {
  width: auto;
}
</style>
