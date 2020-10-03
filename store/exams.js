import jsonData from '@/assets/json/data.json'

export const state = () => ({
  examData: {},
  currentExamDetails: {}
})

export const mutations = {
  SET_EXAM_DATA(state, examData) {
    state.examData = examData
  },
  SET_EXAM_DETAILS(state, examDetails) {
    state.currentExamDetails = examDetails
  }
}

export const actions = {
  getExamDataAction({ commit }) {
    const response = jsonData // await this.$axios.$get()
    commit('SET_EXAM_DATA', response)
  },
  getExamDetailsByExamId({ commit }, examId) {
    const response = jsonData // await this.$axios.$get()
    const detailsObject = response.filter((exam) => {
      return exam.realExamId === examId
    })[0]
    commit('SET_EXAM_DETAILS', detailsObject)
  }
}
