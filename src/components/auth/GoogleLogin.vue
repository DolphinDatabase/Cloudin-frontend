<template>
    <div class="">
      <card-component>
        <button
          type="button"
          @click="login()"
        >
          <img
            src="@/assets/auth/Google.svg"
            class="w-7 mr-2"
          >
          <p>Google Drive</p>
        </button>
      </card-component>
    </div>
  </template>
  
  <script>
  import { googleSdkLoaded } from 'vue3-google-login';
  import axios from 'axios';
  import CardComponent from '@/components/CardComponent.vue'
  
  export default {
      name: 'GoogleLogin',
      components: {
          CardComponent
      },
      data() {
          return {
              auth: null
          }
      },
      mounted() {
          this.listFolders();  
      },
      methods: {
          login() {
              {
                  googleSdkLoaded((google) => {
                      google.accounts.oauth2.initCodeClient({
                          client_id: '532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com',
                          scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.photos.readonly',
                          callback: this.initializeToken
                      }).requestCode()
                  })
              }
          },
          initializeToken(response){
              let payload = {
                  code: response.code,
                  client_id: "532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com",
                  client_secret: "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",
                  redirect_uri: "http://localhost:8080",
                  grant_type: "authorization_code"
              }
  
              axios.post("https://oauth2.googleapis.com/token", payload)
              .then((res) => {
                  this.auth = res.data
                  this.auth.expires_in = new Date().getTime() + res.data.expires_in * 1_000;
                  this.$store.commit('setGoogleAuth', {
                      access_token: this.auth.access_token,
                      expires_in: this.auth.expires_in
                  });
                  window.localStorage.setItem("google", this.auth.refresh_token)
              })
  
          },
          requestToken(callback){
              if(new Date().getTime() < this.auth.expires_in){
                  callback();
                  return;
              }
                  
              let payload = {
                  refresh_token: this.auth.refresh_token,
                  client_id: "532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com",
                  client_secret: "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",
                  grant_type: "refresh_token"
              }
  
  
              this.saveToken(payload, callback);
          },
          refreshToken(payload, callback){
              console.log(payload);
              axios.post("https://oauth2.googleapis.com/token", payload)
              .then((res) => {
                  this.auth = res.data
                  this.auth.expires_in = new Date().getTime() + res.data.expires_in * 1_000;
                  window.localStorage.setItem("auth", JSON.stringify(this.auth))
              })
              .then(callback());
          },
          listFolders(){
              axios.get("https://www.googleapis.com/drive/v3/files", 
              { headers: { Authorization: `Bearer ${this.$store.getters.googleToken}`} })
              .then((res) => {
                  this.files = res.data.files
                  console.log(this.files)
              })
              .catch(err => {
                  console.error(err)
              })
          },
      },
  }
  </script>