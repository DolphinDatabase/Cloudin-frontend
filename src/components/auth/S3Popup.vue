<template>
  <div>
    <div
      class="popup-background"
      @click="closePopup()"
    />
    <div class="popup border-d rounded-lg z-[100] p-8 flex flex-col bg-white-200">
      <div
        class="flex justify-end cursor-pointer"
        @click="closePopup()"
      >
        <XMarkIcon class="h-5 w-5 text-black self-end" />
      </div>
      <img
        src="@/assets/auth/s3.svg"
        class="self-center"
      >
      <label>AWS Access Key Id</label>
      <input v-model="s3Auth.awsAccessKeyId">

      <label>AWS Secret Access Key</label>
      <input v-model="s3Auth.awsSecretAccessKey">

      <label>AWS Region Name</label>
      <input v-model="s3Auth.awsRegionName">

      <label>S3 Bucket Name</label>
      <input v-model="s3Auth.s3BucketName">

      <button
        class="bg-green-500 text-white-100 font-bold py-2 px-4 rounded self-center"
        @click="saveS3Auth()"
      >
        Salvar
      </button>
    </div>
  </div>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/20/solid';


export default {
  name: "S3Popup",
  components: { XMarkIcon },
  data() {
    return {
      s3Auth: {
        awsAccessKeyId: null,
        awsSecretAccessKey: null,
        s3BucketName: null,
        awsRegionName: null
      }
    };
  },
  mounted() {
    let s3Token = this.$store.getters.s3Token;
    
    if(s3Token && s3Token.split(' ').length == 4){
      this.s3Auth = {
        awsAccessKeyId: s3Token.split(' ')[0],
        awsSecretAccessKey: s3Token.split(' ')[1],
        s3BucketName: s3Token.split(' ')[2],
        awsRegionName: s3Token.split(' ')[3]
      }
    }
  },
  methods: {
    saveS3Auth() {
      if(this.s3Auth.awsAccessKeyId && this.s3Auth.awsSecretAccessKey && this.s3Auth.awsRegionName && this.s3Auth.s3BucketName) {
        let s3Token = `${this.s3Auth.awsAccessKeyId} ${this.s3Auth.awsSecretAccessKey} ${this.s3Auth.awsRegionName} ${this.s3Auth.s3BucketName}`;
        this.$store.dispatch("updateS3Token", s3Token);
      }
      this.closePopup();
    },

    closePopup() {
      this.$emit("close");
    }
  }
}
</script>

<style>
.popup-background {
  position: fixed;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000aa;
  z-index: 99;
}

.popup {
  position: absolute;
  top: 10%;
  left: 25%;
  width: 50%;
  height: 68%;
  row-gap: 15px;
  align-items: stretch;
}
</style>
