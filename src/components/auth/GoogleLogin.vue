<template>
    <button type="button" @click="login()">
        <card-component>
            <img src="@/assets/auth/Google.svg" class="w-7 mr-2">
            <p class="cursor-pointer">Autentique com o Google Drive</p>
        </card-component>
    </button>
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
        this.auth = JSON.parse(window.localStorage.getItem("auth"));

        if (this.auth)
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
        initializeToken(response) {
            let payload = {
                code: response.code,
                client_id: "532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com",
                client_secret: "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",
                redirect_uri: "http://localhost:8080",
                grant_type: "authorization_code"
            }

            this.refreshToken(payload);
        },
        requestToken(callback) {
            if (new Date().getTime() < this.auth.expires_in) {
                callback();
                return;
            }

            let payload = {
                refresh_token: this.auth.refresh_token,
                client_id: "532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com",
                client_secret: "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",
                grant_type: "refresh_token"
            }

            this.refreshToken(payload, callback);
        },
        refreshToken(payload, callback) {
            console.log(payload);
            axios.post("https://oauth2.googleapis.com/token", payload)
                .then((res) => {
                    this.auth = res.data
                    this.auth.expires_in = new Date().getTime() + res.data.expires_in * 1_000;
                    // window.localStorage.setItem("auth", JSON.stringify(this.auth))
                    window.localStorage.setItem("google", this.auth.refresh_token)
                })
                .then(callback());
        },
        listFolders() {
            this.requestToken(() => {
                axios.get("https://www.googleapis.com/drive/v3/files",
                    { headers: { Authorization: `Bearer ${this.auth.access_token}` } })
                    .then((res) => {
                        this.files = res.data.files
                        console.log(this.files)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            })
        },
    },
}
</script>