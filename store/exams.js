import jsonData from '@/assets/json/data.json'

export const state = () => ({
  examData: {},
  currentExamDetails: {},
  examFullData: {}
})

export const mutations = {
  SET_EXAM_DATA(state, examData) {
    state.examData = examData
  },
  SET_EXAM_DETAILS(state, examDetails) {
    state.currentExamDetails = examDetails
  },
  SET_EXAM_FULL_DATA(state, examFullData) {
    state.examFullData = examFullData
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
  },
  
  async getExamFullData({ commit }, examId) {
    const examIdUpdated = examId ? 1 : 1
    let examFullData = {}
    try {
      examFullData = await this.$axios.$get(
        'http://localhost:5000/exams/' +
          examIdUpdated
      )
    } catch (error) {
      examFullData = error
    }
    commit('SET_EXAM_FULL_DATA', examFullData)
  }
}
