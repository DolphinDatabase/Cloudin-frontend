<template>
  <div>
    <div
      class="popup-background"
      @click="closePopup()"
    />
    <!-- position: absolute;
    background-color: #F8F8F8;

    top: 10%;
    left: 25%;

    width: 50%;

    margin: 0;
    padding: 10px;

    display: flex;
    flex-direction: column;
    row-gap: 15px;
    align-items: stretch;
    margin: 0 25%; -->
    <div class="popup border-d rounded-lg z-[100] p-8 flex flex-col bg-white-200">
      <img
        src="@/assets/auth/s3.svg"
        class="self-center"
      >

      <label>AWS Access Key Id</label>
      <input v-model="s3Auth.awsAccessKeyId" />

      <label>AWS Secret Access Key</label>
      <input v-model="s3Auth.awsSecretAccessKey" />

      <label>AWS Region Name</label>
      <input v-model="s3Auth.awsRegionName" />

      <label>S3 Bucket Name</label>
      <input v-model="s3Auth.s3BucketName" />

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

export default {
    name: "S3Popup",
    data() {
        return {
            s3Auth: {
                "awsAccessKeyId": null,
                "awsSecretAccessKey": null,
                "awsRegionName": null,
                "s3BucketName": null
            }
        };
    },
    mounted() {
        let s3AuthStorage = JSON.parse(window.localStorage.getItem("s3Auth"));
        if (s3AuthStorage != null)
            this.s3Auth = s3AuthStorage;
    },
    methods: {
        saveS3Auth() {
            window.localStorage.setItem("s3Auth", JSON.stringify(this.s3Auth));
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
    row-gap: 15px;
    align-items: stretch;
}
</style>
