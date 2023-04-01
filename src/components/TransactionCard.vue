<template>
  <div :class="myClass+' mb-4'">
    <img
      :src="myOrigin"
      alt=""
      class="h-18 w-18"
    >
    <ArrowLongRightIcon class="w-5 h-5"/>
    <img
      :src="myDestiny"
      alt=""
      class="h-18 w-18"
    >
    <p class="transaction-status">
      {{this.status}}
    </p>
  </div>
</template>

<script>
import { ArrowLongRightIcon } from '@heroicons/vue/20/solid';
export default {
  name: "TransactionCard",
  data() {
    return {
      myClass: "",
      myOrigin: "",
      myDestiny: "",
    };
  },
  components:{
    ArrowLongRightIcon
  },
  props: {
    destiny: String,
    origin: String,
    status: String,
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
  watch: {
    status: function () {
      this.updateClass();
    },
  },
  methods: {
    updateClass() {
    if (this.status === "Concluido") {
      this.myClass =
        "flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium items-center bg-white-100 card-concluido";
    } else if (this.status === "Erro") {
      this.myClass =
        "flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium items-center bg-white-100  card-falha";
    } else {
      this.myClass =
        "flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium items-center bg-white-100  card-andamento";
    }
  },
  },
};
</script>
<style>
.card-custom {
  border-left: 7px solid;
}
.card-andamento{
  border-left: 7px solid #FFCF4F; /* Change the width and color as desired */
}
.card-concluido{
  border-left: 7px solid #00CB54; /* Change the width and color as desired */
}
.card-falha{
  border-left: 7px solid #FF5344; /* Change the width and color as desired */
}
</style>