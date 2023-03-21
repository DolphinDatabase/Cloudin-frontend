<template>
  <BasePage>
    <div class="my-4">
      <p class="text-2xl text-green-500 font-bold">
        Transferências
      </p>
    </div>
    <div>
      <p class="text-gray-300- tracking-4">
        Configure suas transferências e <br> analise os metadados.
      </p>
    </div>
    <button
      type="button"
      class="bg-green-500"
      @click="isOpenModal = true"
    >
      teste
    </button>
    <ModalComponent v-if="isOpenModal" />
    <table-check />
  </BasePage>
</template>

<script>
import ModalComponent from '@/components/Modal.vue';
import BasePage from '@/components/layout/BasePage.vue';
import TableCheck from '@/components/TableCheck.vue';

export default {
    name: "TransferView",
    components: { BasePage, ModalComponent, TableCheck },
    data() {
        return {
            isOpenModal: false
        }
    },
    methods: {
        openModal(e) {
            console.log(e)
        }
    }
}
</script>