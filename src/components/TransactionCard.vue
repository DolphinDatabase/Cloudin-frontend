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
        <h1>10/07/2002</h1>
        <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-black"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-12 pt-4 pb-4 text-sm bg-gray-100">
        <div class="flex flex-col justify-center items-center gap-6" v-if="this.status != 'Concluido'">
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
    ArrowLongRightIcon
  },
  props: {
    destiny: String,
    origin: String,
    status: String,
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
        this.mySubtitle = "chegará uma notificação quando estuver tudo pronto :)"
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