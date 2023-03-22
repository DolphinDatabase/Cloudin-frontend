<template>
  <BasePage title="Transferências" info="Configure suas transferências e analise os metadados">
    
  </BasePage>
</template>

<script>
import BasePage from '@/components/layout/BasePage.vue';

export default {
    name: "TransferView",
    components: { BasePage},
    data() {
        return {
            isOpenModal: false,
            info: ''
        }
    },
    methods: {

    }
}
</script>