<template>
  <BasePage title="Transferências" info="Configure suas transferências e analise os metadados">
    <AuthPage/>
  </BasePage>
</template>

<script>
import AuthPage from '@/components/layout/AuthPage.vue';
import BasePage from '@/components/layout/BasePage.vue';

export default {
    name: "TransferView",
    components: { BasePage, AuthPage },
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