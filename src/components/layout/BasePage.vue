<template>
  <div id="page">
    <navigation-bar />
    <NotificationComponent ref="notificacao" />
    <div class="container mx-auto space-y-6 h-full">
      <div class="px-[72px] sm:px-48 lg:px-64 ">
        <p class="text-md lg:text-2xl text-green-500 font-bold py-10">
          {{ title }}
        </p>
        <div class="flex justify-between">
          <p class="text-gray-300 tracking-4 text-xs lg:text-base">
            {{ info }}
          </p>

          <button @click="gerarNotificacao('Notificação funcionou PORRA')">Gere notificação</button>
          <button
            v-if="showButton"
            type="button"
            class="flex items-center px-2 py-1 gap-2 border-none rounded-lg bg-green-500 text-white-100 w-[36px] sm:w-[48px] overflow-hidden md:w-28 md:overflow-visible"
            @click="()=>{$emit('clickPageButton')}"
          >
            <div>
              <PlusSmallIcon class="h-5 w-5" />
            </div>
            <span class="text-sm lg:text-base"> Adicionar</span>
          </button>
        </div>
        <div class="mt-8">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
import { PlusSmallIcon } from '@heroicons/vue/24/outline'
import NotificationComponent from '../NotificationComponent.vue';

export default {
  name: "BasePage",
  components: { NavigationBar, PlusSmallIcon, NotificationComponent },
  props: {
    title: {
      required: true,
      type: String
    },
    info: {
      required: true,
      type: String
    },
    showButton: {
      required: true,
      type: Boolean
    }
  },
  methods: {
    gerarNotificacao(msg) {
      const notificacao = this.$refs.notificacao;
      notificacao.exibirNotificacao(msg);
    }
  }
}
</script>

<style scoped>
#page {
  background-color: #F8F8F8;
  height: 100vh;
}
</style>
