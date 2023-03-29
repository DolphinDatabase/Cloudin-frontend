import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
  state: {
    googleAuth: null
  },
  getters: {
    async googleToken(){
      let google = window.localStorage.getItem('google');

      if(!google)
        return null;

      if(this.googleAuth == null || new Date().getTime() < this.googleAuth.expires_in){
        let payload = {
          refresh_token: google,
          client_id: "532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com",
          client_secret: "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",
          grant_type: "refresh_token"
        }
        
        await axios.post("https://oauth2.googleapis.com/token", payload)
        .then((res) => {
          this.googleAuth.access_token = res.data.access_token;
          this.googleAuth.expires_in = new Date().getTime() + res.data.expires_in * 1_000;
        })
      }

      return this.googleAuth.access_token;
    }
  },
  mutations: {
    setGoogleAuth(googleAuth){
      this.googleAuth = googleAuth;
    }
  },
  actions: {

  },
  modules: {
  }
})
