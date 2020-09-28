export const state = () => ({
  userData: {},
  register: false,
  grant_type: 'password'
})

export const mutations = {
  SET_USER_DATA(state, userData) {
    state.userData = userData
  },
  SET_REGISTER_PAGE(state, register) {
    state.register = register
  }
}

export const actions = {
  async loadByIdAndToken({ commit }, { id, token }) {
    const response = await this.$axios.get(`/users/${id}/${token}`)
    return response.data.data.attributes
  }
}

export const getters = {
  playedVideos: (state, getters, rootState, rootGetters) => {
    const user = rootState.auth.user
    return user ? user.played_video_ids : []
  }
}
