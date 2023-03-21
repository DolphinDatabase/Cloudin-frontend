<template>
    <BasePage>
        <button type="button" @click="isOpenModal = true" class="bg-green-500">
            teste
        </button>
        <ModalComponent v-if="isOpenModal"/>
        
    </BasePage>
</template>

<script>
import ModalComponent from '@/components/Modal.vue';
import BasePage from '@/components/layout/BasePage.vue';

export default {
    name: "TransferView",
    data() {
        return {
            isOpenModal: false
        }
    },
    components: { BasePage, ModalComponent },
    methods: {
        openModal(e) {
            console.log(e)
        }
    }
}
</script>