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
<<<<<<< HEAD

=======
import TransactionCard from './TransactionCard.vue'
import notify from '@/utils/notification'
>>>>>>> 867d08c25fe207ef1e43bc8f422098eb6c56d4f9
export default {
  name: "CardCollapseNew",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
    DropDown,
    ModalComponent,
    TableCheck
  },
  data() {
    return {
      origin: '',
      destiny: '',
      status: '',
      modal:false,
      selected:[],
      files:[],
      showDataDiv: true
    }
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
<<<<<<< HEAD
      var headers = {
        headers:{
        origin_token:"",
        destiny_token:"",
        application: window.localStorage.getItem("id")
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
      headers.headers.origin_token = tokenHandler[this.origin]()
      headers.headers.destiny_token = tokenHandler[this.destiny]()
      this.$emit("newTansaction",{origin:this.origin, destiny:this.destiny, status:"Em andamento"})
      api.post("/transaction/",data, headers)
      .then((res)=>{
        for(let i in res.data){
          if("error" in res.data[i]){
            this.$emit("updateStatus",{origin:this.origin, destiny:this.destiny, status:"Falha"})
          }else{
            this.$emit("updateStatus",{origin:this.origin, destiny:this.destiny, status:"Concluído"})
          }
        }

=======
      api.post("/transaction/",data,{headers:{
        origin_token:"AKIA4VVR7RPQYTILT3MO LXYAbeTX6zwfoCdGh4LiAZVEjPwEMvC6ICEBSnDi us-east-1 cloudin-bucket",
        destiny_token:"ya29.a0Ael9sCNf4X7ij_1MnV4OX0FgKspX3EaDKbWF-gJ_wyvq0H4CNPr2oWSoux2wgu7-Y2lzjhXBlvQq9ad9ippvr5QDdxdacyXFpV2a_lAJgUamScnHJeMTHuodjJg3SrBPlfmuJfPbxehtwYIS7XnDta7xBmzaaCgYKAQcSARASFQF4udJhqoIAed3lWkDozkgGbCx5fA0163",
        application:"123123"
      }})
      .then((res)=>{
        for(let l in res.data){
          if("error" in res.data[l]){
            notify({icon:"erro",text:"Falha na transação"})
          }else{
            notify({icon:"concluido",text:"Transação realizada com sucesso"})
          }
        }
        console.log(res);
>>>>>>> 867d08c25fe207ef1e43bc8f422098eb6c56d4f9
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