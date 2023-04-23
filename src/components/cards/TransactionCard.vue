<template>
  <div class="w-[100%] mt-4">
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="shadow flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium bg-white-100"
        :class="myClass"
      >
        <div class="flex gap-8 items-center">
          <img
            :src="myOrigin"
            alt=""
            class="h-18 w-18"
          >
          <p class="font-bold text-gray-500">
            De: {{ originFolder }}
          </p>
          <ArrowLongRightIcon class="w-5 h-5" />
          <img
            :src="myDestiny"
            alt=""
            class="h-18 w-18"
          >
        </div>
        <p class="font-bold text-gray-500">
          Para: {{ destinyFolder }}
        </p>
        <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-black"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-12 pt-4 pb-4 text-sm bg-white-100">
        <div v-if="transactions.length>0">
          <p>Criado: {{ created }}</p>
          <br>
          <div class=" border rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Transação
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Data e Hora
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="t in transactions" 
                  :key="t.id"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ t.id }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ new Date(t.created).toLocaleDateString('pt-BR') }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ t.status }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-green-500 hover:text-green-900" @click="this.details = { transaction: t, show: true }">
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h5 v-else>Nenhuma transação realizada</h5>
      </DisclosurePanel>
    </Disclosure>
    <TransactionsDetails v-if="this.details.show" :transaction="this.details.transaction" @close="this.details.show = false"/>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid'
import TransactionsDetails from './TransactionsDetails.vue'
import Erro from '@/assets/erro.svg'
import Andamento from '@/assets/emAndamento.svg'
export default {
  name: "TransactionCard",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
    ArrowLongRightIcon,
    TransactionsDetails
  },
  props: {
    origin: {
      type: String,
      required: true,
    },
    destiny: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    destinyFolder: {
      type: String,
      required: true,
    },
    originFolder: {
      type: String,
      required: true,
    },
    transactions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      myClass: "",
      myOrigin: "",
      myDestiny: "",
      myImage: "",
      imageClass: "",
      myMessage: "",
      mySubtitle: "",
      logos: {
        "s3": require("@/assets/auth/s3-white.svg"),
        "google": require("@/assets/auth/google.svg")
      },
      statusHandler: {
        "Em andamento": this.setToEmAndamento,
        "Erro": this.setToErro,
        "Concluido": this.setToConcluido
      },
      details: {
        show: false,
        transaction: null
      }
    };
  },
  watch: {
    status: function () {
      this.statusHandler[this.status]();
    },
  },
  mounted() {
    this.myOrigin = this.logos[this.origin];
    this.myDestiny = this.logos[this.destiny];

    this.statusHandler[this.status]();
  },
  methods: {
    setToEmAndamento() {
      this.myClass = "flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium items-center bg-white-100 card-andamento";
      this.myImage = Andamento;
      this.imageClass = "w-[300px]";
      this.myMessage = "Sua transferência está em andamento";
      this.mySubtitle = "chegará uma notificação quando estiver tudo pronto :)";
    },
    setToErro() {
      this.myClass = "flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium items-center bg-white-100 card-falha";
      this.myImage = Erro;
      this.imageClass = "w-[400px]";
      this.myMessage = "OOPS...";
      this.mySubtitle = "Parece que houve algum erro de conexão!";
    },
    setToConcluido() {
      this.myClass = "flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium items-center bg-white-100 card-concluido";
    },
  }
}
</script>

<style scoped>
.card-custom {
  border-left: 7px solid;
}

.card-andamento {
  border-left: 7px solid #FFCF4F;
  /* Change the width and color as desired */
}

.card-concluido {
  border-left: 7px solid #00CB54;
  /* Change the width and color as desired */
}

.card-falha {
  border-left: 7px solid #FF5344;
  /* Change the width and color as desired */
}
</style>