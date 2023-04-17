import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      data: {
        google:null,
        s3:null,
        files: [
          {
            "destiny": "google",
            "destinyFolder": "1vsYhJi34hozGjnsWvHeeAq2QyA8vbATl",
            "destinyToken": "ya29.a0Ael9sCNAgLOdDwcQlHsLgzlEO8i2SLPpCYRvDkGKPcWUDvNM2hk5xvMEbRApi_oYe4yxPpblpPOmvUbw_bcr1dAQt9SRnwFb_glURg_WDiiFcRW3jcVKiXZ1V4OhJ5AkYgOBrhdQTQQ3mNIaQvLuY7xJNko8aCgYKAQgSARESFQF4udJhC10YkDvFHgiYLQST_HbvEA0163",
            "id": 1,
            "origin": "s3",
            "originFolder": "pastaTeste",
            "originToken": "AKIA4VVR7RPQYTILT3MO LXYAbeTX6zwfoCdGh4LiAZVEjPwEMvC6ICEBSnDi us-east-1 cloudin-bucket",
            "transaction": [
              {
                "created": "2023-04-12T23:16:27",
                "file": [
                  {
                    "id": 1,
                    "name": "CamScanner 04-11-2023 18.55.pdf",
                    "size": "312732.0",
                    "time": "00:00:04"
                  }
                ],
                "id": 1,
                "status": "Concluido"
              }
            ]
          }
        ]
      }
    }
  },
  getters: {
    getGoogleToken(state){
      return state.google
    },
    getS3Token(state){
      return state.s3
    },
    getFileById: (state) => (id) => {
      return state.data.files.find(file => file.id === id)
    },
    getConfigs: (state) => {
      return state.data.files
    },
    getTransactionByFileId: (state) => (fileId) => {
      const file = state.data.files.find(file => file.id === fileId)
      return file ? file.transaction[0] : null
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
export default store;