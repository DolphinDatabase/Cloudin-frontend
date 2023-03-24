<template>
    <div class="">
        <card-component>
            <button type="button"
                @click="login()">
                <img src="@/assets/auth/Google.svg" class="w-7 mr-2">
                <p>Google Drive</p>
            </button>
        </card-component>
    </div>
</template>

<script>
import { googleSdkLoaded } from 'vue3-google-login';
import axios from 'axios';
import google from '@/assets/auth/Google.svg'
import CardComponent from '@/components/CardComponent.vue'

export default {
    name: 'GoogleLogin',
    components: {
        CardComponent
    },
    data() {
        google
    },
    mounted() {
        if (window.localStorage.getItem("auth")) {
            this.auth = true
            this.listFolders()
        }
    },
    methods: {
        login() {
            {
                googleSdkLoaded((google) => {
                    google.accounts.oauth2.initTokenClient({
                        client_id: '532089225272-1im33klerc0hmvspgo6mh08aobithavt.apps.googleusercontent.com',
                        scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.photos.readonly',
                        callback: (response) => {
                            console.log(response)
                            window.localStorage.setItem("auth", JSON.stringify(response))
                            this.listFolders()
                        }
                    }).requestAccessToken()
                })
            }
        },
        async listFolders() {
            const auth = JSON.parse(window.localStorage.getItem("auth"))
            axios.get("https://www.googleapis.com/drive/v3/files", { headers: { Authorization: 'Bearer ' + auth.access_token } })
                .then((res) => {
                    this.files = res.data.files
                })
                .catch(err => {
                    console.log(err)
                })
        }

    }
}
</script>