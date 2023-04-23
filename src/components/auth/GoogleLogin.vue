<template>
    <button type="button" @click="login()">
        <card-component>
            <img src="@/assets/auth/google.svg" class="w-7 mr-2">
            <p class="cursor-pointer">Autentique com o Google Drive</p>
        </card-component>
    </button>
</template>

<script>
import { googleSdkLoaded } from 'vue3-google-login';
import axios from 'axios';
import CardComponent from '@/components/cards/CardComponent.vue'

export default {
    name: 'GoogleLogin',
    components: {
        CardComponent,
    },
    data() {
        return {
            auth: null
        }
    },
    methods: {
        login() {
            googleSdkLoaded((google) => {
                google.accounts.oauth2.initCodeClient({
                    client_id: '532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com',
                    scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.photos.readonly',
                    callback: this.initializeToken
                }).requestCode()
            })
        },
        initializeToken(response) {
            var data = {
                code:response.code,
                client_id:"532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com",
                client_secret:"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",
                redirect_uri:"http://localhost:8080",
                grant_type:"authorization_code"
            }
            axios.post("https://oauth2.googleapis.com/token",data)
            .then(res=>{
                this.$store.dispatch("updateGoogleToken",res.data.refresh_token)
                this.$store.dispatch("updateGoogleAccessToken",res.data.access_token)
            })
        }
    }
}
</script>