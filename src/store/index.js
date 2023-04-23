import { createStore } from 'vuex'
import api from '@/services/api'

const store = createStore({
  state() {
    return {
      data: {
        id: null,
        google:null,
        google_access:null,
        s3:null,
        files: []
      }
    }
  },
  getters: {
    id(state){
      return state.data.id;
    },
    googleAccessToken(state) {
      return state.data.google_access;
    },
    s3Token(state){
      return state.data.s3;
    },
    configs(state){
      return state.data.files;
    }
  },
  mutations: {
    setGoogleToken (state, token) {
      state.data.google = token
    },
    setGoogleAccessToken (state, token) {
      state.data.google_access = token
    },
    setS3Token (state, token) {
      state.data.s3 = token
    },
    setFiles(state,data){
      state.data.files = data
    },
    newTransaction(state,data){
      var index = state.data.files.findIndex(config=>config.id==data.config)
      state.data.files[index].transaction.push(data.transaction)
    },
    updateTransaction(state,data){
      var configIndex = state.data.files.findIndex(config=>config.id==data.config)
      var transactionIndex = state.data.files[configIndex].transaction.findIndex(trn=>trn.id==data.transaction.id)
      state.data.files[configIndex].transaction[transactionIndex] = data.transaction
    },
    initialiseStore(state) {
			if(!localStorage.getItem('store')){
        state.data.id = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
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
    updateGoogleAccessToken (context, token) {
      context.commit('setGoogleAccessToken', token)
    },
    updateS3Token (context, token) {
      context.commit('setS3Token', token)
    },
    fetchConfig (context) {
      api.get("/config")
      .then((res)=>{
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