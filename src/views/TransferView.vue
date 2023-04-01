<template>
  <BasePage
    title="Transferências"
    info="Realize suas transferências e analise os metadados"
    :show-button="true"
  >
    <div class="contents">
      <CardCollapseNew @newTansaction="(data) => this.newTransaction(data)" @updateStatus="(data) => this.newTansactionStatus(data)" />
    </div>
    <div
      v-if="this.transactions.length<=0"
      class="flex justify-center items-center flex-col"
    >
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
    <div class="mt-8">
      <TransactionCard v-for="t in this.transactions" :key="t.id" :destiny="t.destiny" :origin="t.origin" :status="t.status"/>
    </div>
    
  </BasePage>
</template>

<script>
import BasePage from '@/components/layout/BasePage.vue';
import CardCollapseNew from '@/components/CardCollapseNew.vue'
import TransactionCard from '@/components/TransactionCard.vue'
import api from '@/services/api';
import notify from '@/utils/notification'
export default {
  name: "TransferView",
  components: {
    BasePage,
    CardCollapseNew,
    TransactionCard
  },
  mounted(){
    var get_transaction_list_url = "/transaction/" + window.localStorage.getItem("id")
    api.get(get_transaction_list_url)
    .then((res)=>{
      for(let t in res.data){
        this.transactions.push(t)
      }
    })
  },
  data() {
    return {
      transfers: 0,
      transactions:[]
    }
  },
  methods:{
    newTransaction(data){
      this.transactions.push(data)
    },
    newTansactionStatus(data){
        if(data.status == "Falha"){
          notify({title:"Falha na transferência",text:"Verifique seus arquivos",icon:"erro"})
        }else{
          notify({title:"Transferência concluída",text:"Todos os arquivos transferidos",icon:"concluido"})
        }
      this.transactions[this.transactions.length-1]=data
    }
  }
}
</script>

<style scoped>
span {
  font-weight: 700;
  color: #96DA84;
}
</style>