import jsonData from '@/assets/json/data.json'

export const state = () => ({
  examData: {}
})

export const mutations = {
  SET_EXAM_DATA(state, examData) {
    state.examData = examData
  }
}

export const actions = {
  getExamDataAction({ commit }) {
    const response = jsonData // await this.$axios.$get()
    commit('SET_EXAM_DATA', response)
  }
}
