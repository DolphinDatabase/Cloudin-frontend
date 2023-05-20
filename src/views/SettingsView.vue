<template>
  <BasePage
    title="Configurações"
    info="Autentique e configure suas transferências"
    :show-button="false"
  >
    <div class="mb-8">
      <AuthPage />
    </div>
    <SettingsPage/>
  </BasePage>
</template>

<script>
import AuthPage from '@/components/layout/AuthPage.vue';
import BasePage from '@/components/layout/BasePage.vue';
import SettingsPage from '@/components/layout/SettingsPage.vue';

export default {
    name: "SettingsView",
    components: { BasePage, AuthPage, SettingsPage }
}
</script>