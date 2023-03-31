<template>
  <div class="w-[100%]">
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium"
      >
        <span>Preencha os campos cuidadosamente</span>
        <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-black"
        />
      </DisclosureButton>
      <DisclosurePanel
        class="px-12 pt-4 pb-4 text-sm bg-gray-100"
        static
      >
        <div class="flex justify-between mb-2">
          <div>
            <p>De:</p>
            <DropDown
              :list="[{ nome: 'Google' }, { nome: 'S3' }]"
              @onSelect="(e) => { origin = e }"
            />
          </div>
          <ArrowSmallRightIcon />
          <div>
            <p>De:</p>
            <DropDown
              :list="[{ nome: 'Google' }, { nome: 'S3' }]"
              @onSelect="(e) => { destiny = e }"
            />
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="bg-green-500 text-white-100 font-bold py-2 px-4 rounded"
            @click="chooseFiles()"
          >
            Escolher arquivos
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <TransactionCard v-for="t in this.transactions" :key="t.id" :destiny="t.destiny" :origin="t.origin" :status="t.status"/>
    <!-- <img src="@/assets/emAndamento.svg">
    <img src="@/assets/erro.svg"> -->
  </div>
  <ModalComponent
    title="Selecione Arquivos para a transferência"
    :open="modal"
    @closeModal="()=>{modal=false}"
    @submitData="()=>{submitTransaction()}"
  >
    <TableCheck
      ref="table"
      :data="files"
    />
  </ModalComponent>
</template>
<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import ModalComponent from '@/components/Modal.vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import DropDown from '@/components/Dropdown.vue'
import api from '@/services/api'
import TableCheck from '@/components/TableCheck.vue'
import TransactionCard from './TransactionCard.vue'
export default {
  name: "CardCollapseNew",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
    DropDown,
    ModalComponent,
    TableCheck,
    TransactionCard
  },
  data() {
    return {
      origin: '',
      destiny: '',
      status: '',
      modal:false,
      selected:[],
      files:[],
      showDataDiv: true,
      transactions:[]
    }
  },
  mounted(){
    // var aplication_id = window.localStorage.getItem("id")
    var aplication_id = "123123"
    var get_transaction_list_url = "/transaction/" + aplication_id
    api.get(get_transaction_list_url)
      .then((res)=>{
        // Criando a nova div
        this.transactions.push(res.data)
      })
  },
  methods: {
    async submitTransaction(){
      this.modal = false
      var selected = []
      this.$refs.table.selected.forEach(file => {
        let s = this.files.filter(
          (f)=>{return f.id==file}
        )
        selected.push({file_id:s[0].id,file_name:s[0].name})
      });
      var data = {
        origin:this.origin,
        destiny:this.destiny,
        files:selected
      }
      var headers = {
        headers:{
        origin_token:"",
        destiny_token:"",
        // application: window.localStorage.getItem("id")
        application: "123123"
      }}
      let tokenHandler = {
        "google" : () => {
          return window.localStorage.getItem("google")
        },
        "s3" : () => {
          let s3Auth = JSON.parse(window.localStorage.getItem("s3Auth"))
          return `${s3Auth.awsAccessKeyId} ${s3Auth.awsSecretAccessKey} ${s3Auth.awsRegionName} ${s3Auth.s3BucketName}`
        }
      }
      headers.origin_token = tokenHandler[this.origin]()
      headers.destiny_token = tokenHandler[this.destiny]()
      this.transactions.push({origin:this.origin, destiny:this.destiny, status:"Em andamento"})
      api.post("/transaction/",data, {headers:headers})
      .then((res)=>{
        // Criando a nova div
        console.log(res)
        console.log(res.data)
      })
    },
    async listFiles(){
      var tk = ""
      if(this.origin=="google"){
          tk +=  window.localStorage.getItem("google")
      } else if (this.origin=="s3"){
        let s3Auth = JSON.parse(window.localStorage.getItem("s3Auth"))
          tk +=  `${s3Auth.awsAccessKeyId} ${s3Auth.awsSecretAccessKey} ${s3Auth.awsRegionName} ${s3Auth.s3BucketName}`
          
      }
      const res = await api.get("/"+this.origin+"/list",{headers:{
        token:tk
      }})
      this.files = res.data.result
    },
    chooseFiles() {
      if (this.origin == '' || this.origin == null || this.destiny == '' || this.destiny == null) {
        console.error("no drives selected")
      } else {
        this.listFiles()
        this.modal=true
      }
    }
  }
}
</script>