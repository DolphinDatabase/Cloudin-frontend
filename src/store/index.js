import { createStore } from 'vuex'

export default createStore({
  state: {
    google:null,
    s3:null
  },
  getters: {
    getGoogleToken(state){
      return state.google
    },
    getS3Token(state){
      return state.s3
    }
  },
  mutations: {
    setGoogleToken (state, token) {
      state.google = token
    },
    setS3Token (state, token) {
      state.s3 = token
    }
  },
  actions: {
    updateGoogleToken (context, token) {
      context.commit('setGoogleToken', token)
    },
    updateS3Token (context, token) {
      context.commit('setS3Token', token)
    }
  },
  modules: {
  }
})
