<template>
  <div class="flex flex-col">
    <div class="font-bold">
      <p class="text-sm md:text-base">
        Faça sua autenticação
      </p>
    </div>
    <div class="flex flex-wrap">
      <div>
        <GoogleLogin />
      </div>
      <div>
        <S3Login />
      </div>
    </div>
  </div>
</template>

<script>
import GoogleLogin from '../auth/GoogleLogin.vue'
import S3Login from '../auth/S3Login.vue'

export default {
  name: "AuthPage",
  components: { GoogleLogin, S3Login },
}
</script>