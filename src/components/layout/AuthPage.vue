<template>
  <div class="flex justify-center align-center flex-col">
    <div class="mt-16 font-bold">
      <p>
        Para começar faça sua autenticação
      </p>
    </div>
    <!-- <div class="w-max -mb-3">
      <a
        v-for="(item, index) in auths"
        :key="index"
        class="group flex items-center space-x-1 rounded-md px-4 py-3 text-white"
      > <img
        :src="item.imageUrl"
        alt=""
        class="w-10 h-10 mr-4"
      >{{ item.label }}</a>
    </div> -->
    <GoogleLogin />
    <S3Login />
  </div>
</template>

<script>
import google from '@/assets/auth/Google.svg'
import s3 from '@/assets/auth/s3.svg'
import GoogleLogin from '../auth/GoogleLogin.vue'
import S3Login from '../auth/S3Login.vue'

export default {
    name: "AuthPage",
    components: { GoogleLogin, S3Login },
    data() {
        return {
            auths: [
                {
                    label: "Autenticar com Google Drive",
                    imageUrl: google
                },
                {
                    label: "Autenticar com S3",
                    imageUrl: s3
                },
            ],
        };
    }
}
</script>