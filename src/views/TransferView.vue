<template>
  <BasePage
    title="Transferências"
    info="Realize suas transferências e analise os metadados"
    :show-button="true"
    @clickPageButton="showCollapse = true"
  >
    <!-- <TransactionsDetails title="Transacao 1" create-date="2023-01-01" status="Em Andamento" :files="this.files"/> -->

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
      <div>
        <label>Status:</label>
        <select
          v-model="transferStatus"
          @change="filterTransactions()"
        >
          <option
            value=""
            default
          >
            Todos
          </option>
          <option value="Concluido">
            Concluído
          </option>
          <option value="Em andamento">
            Em andamento
          </option>
          <option value="Erro">
            Erro
          </option>
        </select>

        <ul>
          <li
            v-for="transfer in filteredTransferList"
            :key="transfer.id"
          >
            {{ transfer.status }} - {{ transfer.name }}
          </li>
        </ul>
      </div>
      <TransactionCard
        v-for="t in filtered"
        :key="t.id"
        :destiny="t.destiny"
        :origin="t.origin"
        :status="(t.transaction.length > 0) ? t.transaction[t.transaction.length - 1].status : 'Concluido'"
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
import { mapState } from 'vuex'

export default {
  name: "TransferView",
  components: {
    BasePage,
    CardCollapseNew,
    TransactionCard
  },
  data() {
    return {
      transferStatus: "",
      filtered: [],
      transactions: [],
      showCollapse: false,
      eventsHandler: {
        newTransaction: this.newTransaction,
      },
      files: [
        {
          name: "teste",
          size: 15584115
        },
        {
          name: "teste 123",
          size: 1231
        }
      ]
    }
  },
  computed: {
    ...mapState({
      config: state => state.data.files
    })
  },
  watch: {
    'config': {
      deep: true,
      handler(data) {
        console.log(data)
        this.transactions = data
      }
    }
  },
  created() {
    this.transactions = this.$store.getters.configs
    this.filtered = this.transactions
  },
  methods: {
    filterTransactions() {
      if (this.transferStatus == "") {
        this.filtered = this.transactions
      } else {
        this.filtered = []
        this.transactions.forEach(trn => {
          if (trn.transaction[trn.transaction.length - 1].status == this.transferStatus) {
            this.filtered.push(trn)
          }
        })
      }
    },
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