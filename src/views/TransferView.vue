<template>
  <BasePage
    title="Transferências"
    info="Realize suas transferências e analise os metadados"
    :show-button="true"
  >
    <div class="flex justify-center align-center">
      <div v-if="transfers == 0">
        <img
          src="@/assets/adicionar.svg"
          class="w-[680px]"
        >
        <div class="mt-8 justify-center flex">
          <p class="lg:text-base text-sm">
            Não encontramos nenhuma transferência, clique no botão <span>adicionar</span> para começar!
          </p>
        </div>
      </div>
      <div v-else>
        <CardCollapseNew/>
      </div>
    </div>
  </BasePage>
</template>

<script>
import BasePage from '@/components/layout/BasePage.vue';
import CardCollapseNew from '@/components/CardCollapseNew.vue'

export default {
    name: "TransferView",
    components: {
        BasePage,
        CardCollapseNew

    },
    data() {
        return {
            transfers: 0,
        }
    },
    
}
</script>

<style scoped>
span {
    font-weight: 700;
    color: #96DA84;
}
</style>