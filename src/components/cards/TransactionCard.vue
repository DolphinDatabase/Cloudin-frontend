<template>
  <div class="w-[100%]">
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
          <ArrowLongRightIcon class="w-5 h-5" />
          <img
            :src="myDestiny"
            alt=""
            class="h-18 w-18"
          >
        </div>
        <p class="font-bold text-gray-500">
          De: {{ originFolder }}
        </p>
        <p class="font-bold text-gray-500">
          Para: {{ destinyFolder }}
        </p>
        <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-black"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-12 pt-4 pb-4 text-sm bg-white-100">
        <div
          v-if="status != 'Concluido'"
          class="flex flex-col justify-center items-center gap-6"
        >
          <img
            :src="myImage"
            alt=""
            :class="imageClass"
          >
          <div class="flex flex-col gap-2 items-center">
            <p class="font-bold lg:text-lg">
              {{ myMessage }}
            </p>
            <p class="font-light text-gray-201">
              {{ mySubtitle }}
            </p>
          </div>
        </div>
        <div v-else>
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
                      {{ t.created }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ t.status }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-green-500 hover:text-green-900">
                      Ver detalhes
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon, ArrowLongRightIcon } from '@heroicons/vue/20/solid'
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
      Erro,
      Andamento
    };
  },
  watch: {
    status: function () {
      this.updateClass();
    },
  },
  mounted() {
    if (this.origin === "s3") {
      this.myOrigin = require("@/assets/auth/s3-white.svg");
    } else {
      this.myOrigin = require("@/assets/auth/Google.svg");
    }
    if (this.destiny === "google") {
      this.myDestiny = require("@/assets/auth/Google.svg");
    } else {
      this.myDestiny = require("@/assets/auth/s3-white.svg");
    }
    this.updateClass();
    console.log(this.transactions)
  },
  methods: {
    updateClass() {
      if (this.status === "Concluido") {
        this.myClass =
          "flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium items-center bg-white-100 card-concluido";
      } else if (this.status === "Erro") {
        this.myClass =
          "flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium items-center bg-white-100  card-falha";
        this.myImage = Erro;
        this.imageClass = "w-[400px]"
        this.myMessage = "OOPS..."
        this.mySubtitle = "Parece que houve algum erro de conexão!"
      } else {
        this.myClass =
          "flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium items-center bg-white-100  card-andamento";

        this.myImage = Andamento;
        this.imageClass = "w-[300px]"
        this.myMessage = "Sua transferência está em andamento"
        this.mySubtitle = "chegará uma notificação quando estiver tudo pronto :)"
      }
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