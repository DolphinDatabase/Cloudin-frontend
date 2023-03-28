<template>
  <div class="">
    <card-component>
      <button @click="showPopup = true">
        <img
          src="@/assets/auth/s3.svg"
          class="w-7 mr-2"
        >
        <label>S3</label>
      </button>
    </card-component>
    <s3-popup
      v-if="showPopup"
      @close="showPopup = false"
    />
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent.vue'
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
