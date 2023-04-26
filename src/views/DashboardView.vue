<template>
    <BasePage
      title="Estatísticas de Transferências"    
      :show-button="false"
    >
      <DashboardPage />
    </BasePage>    
  </template>
  
  <script>
    import DashboardPage from '@/components/layout/DashboardPage.vue';
    import BasePage from '@/components/layout/BasePage.vue';
    
    export default {
        name: "DashboardView",
        components: { BasePage, DashboardPage }
    }
  </script>