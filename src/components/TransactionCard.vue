<template>
  <div :class="myClass">
    <img
      src="@/assets/auth/Google.svg"
      alt=""
    >
    <p>-></p>
    <img
      src="@/assets/auth/s3.svg"
      alt=""
    >
    <p class="transaction-status">
      {{this.status}}
    </p>
  </div>
</template>

<script>
export default {
    name: "TransactionCard",
    data(){
      return{
        myClass:"flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium items-center card-andamento"
      }
    },
    props:{
    destiny:String,
    origin:String,
    status:String
    },
    mounted(){
    if (this.status === "Concluído") {
      this.myClass.replace("card-andamento", "card-concluido")
    } else if (this.status === "Falha") {
      this.myClass.replace("card-andamento", "card-falha")
    }
  }
}
</script>

<style>
.card-andamento{
  border-left: 7px solid yellow; /* Change the width and color as desired */
}
.card-concluido{
  border-left: 7px solid green; /* Change the width and color as desired */
}
.card-falha{
  border-left: 7px solid red; /* Change the width and color as desired */
}
</style>