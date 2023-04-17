<template>
  <BasePage
    title="Transferências"
    info="Realize suas transferências e analise os metadados"
    :show-button="true"
    @clickPageButton="showCollapse = true"
  >
    <div
      v-if="transactions.length <= 0 && !showCollapse"
      class="flex justify-center items-center flex-col"
    >
      <img
        src="@/assets/adicionar.svg"
        alt=""
        class="w-[680px]"
      >
      <div class="mt-8 justify-center flex">
        <p class="lg:text-base text-sm">
          Não encontramos nenhuma transferência, clique no botão <span>adicionar</span> para começar!
        </p>
      </div>
    </div>

    <div v-if="showCollapse">
      <div class="contents">
        <CardCollapseNew v-on="eventsHandler" />
      </div>
    </div>

    <div>
      <TransactionCard
        v-for="t in transactions"
        :key="t.id"
        :destiny="t.destiny"
        :origin="t.origin"
        :status="t.transaction[t.transaction.length-1].status"
        :destiny-folder="t.destinyFolder"
        :origin-folder="t.originFolder"
        :transactions="t.transaction"
      />
    </div>
  </BasePage>
</template>

<script>
import BasePage from '@/components/layout/BasePage.vue';
import CardCollapseNew from '@/components/cards/CardCollapseNew.vue'
import TransactionCard from '@/components/cards/TransactionCard.vue'
import api from '@/services/api';
import notify from '@/utils/notification'

export default {
  name: "TransferView",
  components: {
    BasePage,
    CardCollapseNew,
    TransactionCard,
  },
  data() {
    return {
      transactions: [],
      showCollapse: false,
      eventsHandler: {
        newTransaction: this.newTransaction,
      },
    }
  },
  created() {
    this.transactions = this.$store.getters.getConfigs
  },
  methods: {
    newTransaction(payload) {
      this.transactions.push(payload);
      this.showCollapse = false;

      api.post("/transaction/", payload.data, payload.headers)
        .then((res) => {
          for (let i in res.data) {
            if ("error" in res.data[i]) {
              this.newTransactionStatus({ origin: this.origin, destiny: this.destiny, status: "Erro" });
            } else {
              this.newTransactionStatus({ origin: this.origin, destiny: this.destiny, status: "Concluido" });
            }
          }
        })

    },
    newTransactionStatus(data) {
      if (data.status == "Erro") {
        notify({ title: "Falha na transferência", text: "Verifique seus arquivos", icon: "erro" })
      } else {
        notify({ title: "Transferência concluída", text: "Todos os arquivos transferidos", icon: "concluido" })
      }
      this.transactions[this.transactions.length - 1] = data

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