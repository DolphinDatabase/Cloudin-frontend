<template>
  <div class="">
    <button @click="showPopup = true">
      <card-component>
        <img
          src="@/assets/auth/s3.svg"
          class="w-7 mr-2"
        >
        <p class="cursor-pointer">
          Autentique com o S3
        </p>
      </card-component>
    </button>

    <s3-popup
      v-if="showPopup"
      @close="showPopup = false"
    />
  </div>
</template>

<script>
import CardComponent from '@/components/cards/CardComponent.vue'
import S3Popup from './S3Popup.vue';

export default {
  name: 'S3Login',
  components: {
    CardComponent,
    S3Popup
  },
  data() {
    return {
      showPopup: false
    }
  }
}
</script>
