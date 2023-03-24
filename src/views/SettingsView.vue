<template>
  <BasePage
    title="Configurações"
    info="Autentique suas contas para realizar as transferências"
    :show-button="false"
  >
    <AuthPage />
  </BasePage>
</template>

<script>
import AuthPage from '@/components/layout/AuthPage.vue';
import BasePage from '@/components/layout/BasePage.vue';

export default {
    name: "SettingsView",
    components: { BasePage, AuthPage }
}
</script>