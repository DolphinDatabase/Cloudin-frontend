<template>
    <div class="popup-background" @click="closePopup()"/>
    <div class="popup">
        <img src="@/assets/auth/s3.svg" class="w-20 mr-10">

        <label>AWS Access Key Id</label>
        <input v-model="s3Auth.awsAccessKeyId"/>

        <label>AWS Secret Access Key</label>
        <input v-model="s3Auth.awsSecretAccessKey"/>

        <label>AWS Region Name</label>
        <input v-model="s3Auth.awsRegionName"/>

        <label>S3 Bucket Name</label>
        <input v-model="s3Auth.s3BucketName"/>

        <button @click="saveS3Auth()">Salvar</button>
    </div>
</template>

<script>
export default {
    name: 'S3Popup',
    data() {
        return {
            s3Auth: {
                'awsAccessKeyId': null,
                'awsSecretAccessKey': null,
                'awsRegionName': null,
                's3BucketName': null
            }
        }
    },
    mounted() {
        let s3AuthStorage = JSON.parse(window.localStorage.getItem('s3Auth'));
        if(s3AuthStorage != null)
            this.s3Auth = s3AuthStorage
    },
    methods: {
        saveS3Auth() {
            window.localStorage.setItem('s3Auth', JSON.stringify(this.s3Auth));
            this.closePopup();
        },
        closePopup() {
            this.$emit('close');
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
        background-color: #F8F8F8;

        top: 10%;
        left:25%;

        width: 50%;

        margin: 0;
        padding: 10px;
        border: 25% solid black;
        z-index: 100;

        display: flex;
        flex-direction: column;
        row-gap: 15px;
        align-items: stretch;
    }

    .popup input {
        height: 30px;
        background-color: white;
    }

    .popup img {
        align-self: center;
    }

    .popup button {
        border-radius: 10px;
        padding: 10px;

        font-weight: 700;
        background-color: #96DA84;
        color: #F8F8F8;

        align-self: center;
    }
</style>
