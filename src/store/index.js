import { createStore } from 'vuex'
import api from '@/services/api'

const store = createStore({
  state() {
    return {
      id: null,
      googleToken: null,
      s3Token: null,
      files: []
    }
  },
  getters: {
    id(state){
      return state.id;
    },
    googleToken(state){
      return state.googleToken;
    },
    s3Token(state){
      return state.s3Token;
    },
    configs(state){
      return state.files;
    }
  },
  mutations: {
    setGoogleToken (state, token) {
      state.googleToken = token;
    },
    setS3Token (state, token) {
      state.s3Token = token;
    },
    setFiles(state,data){
      state.files = data
    },
    newTransaction(state,data){
      var index = state.files.findIndex(config=>config.id==data.config)
      state.files[index].transaction.push(data.transaction)
    },
    updateTransaction(state,data){
      var configIndex = state.files.findIndex(config=>config.id==data.config)
      var transactionIndex = state.files[configIndex].transaction.findIndex(trn=>trn.id==data.transaction.id)
      state.files[configIndex].transaction[transactionIndex] = data.transaction
    },
    initialiseStore(state) {
			if(!localStorage.getItem('store')){
        state.id = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        return;
      }
      
      let storageState = JSON.parse(localStorage.getItem('store'));
      this.replaceState(Object.assign(state, storageState));
		}
  },
  actions: {
    updateGoogleToken (context, token) {
      context.commit('setGoogleToken', token)
    },
    updateS3Token (context, token) {
      context.commit('setS3Token', token)
    },
    fetchConfig (context) {
      api.get("/config")
      .then((res)=>{
        console.log(res.data)
        context.commit('setFiles',res.data)
      })
    }
  }
})

store.commit('initialiseStore');

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;