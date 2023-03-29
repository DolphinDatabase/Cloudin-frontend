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
    <TransactionCard/>
    <img src="@/assets/emAndamento.svg">
    <img src="@/assets/erro.svg">
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
      this.$emit("newTransaction",{origin:this.origin,destiny:this.destiny})
      api.post("/transaction/",data,{headers:{
        origin_token:"AKIA4VVR7RPQYTILT3MO LXYAbeTX6zwfoCdGh4LiAZVEjPwEMvC6ICEBSnDi us-east-1 cloudin-bucket",
        destiny_token:"ya29.a0Ael9sCMmfe1zrLrVXohsEBVYjfk0Abnafb0I9d2tlzENNTxw7MDaxwXUkhTTgZPPdUkDULYBRl81w2AVUcD_d2VEEHJvrWtB4H2JF0S0uM8n04tpdN1EpuiT97JqbzXnwUMnaVbKX9IquW0KXSHpDIjapJ1GaCgYKAdkSARISFQF4udJhVnRuxq5fljp9KD8EAjTSyw0163",
        application:"654321"
      }})
      .then((res)=>{
        this.$emit("newTansactionStatus",res)
        // Criando a nova div
        const div = new TransactionCard
        
        // Adicionando o conteúdo na div
        div.innerHTML = `<p>Nova transação:</p>
                          <p>Origem: ${this.origin}</p>
                          <p>Destino: ${this.destiny}</p>
                          <p>Arquivos:</p>`
        selected.forEach((file) => {
          div.innerHTML += `<p>- ${file.file_name}</p>`
        })
        
        // Adicionando a nova div ao DOM
        document.body.appendChild(div)
      })
    },
    async listFiles(){
      const res = await api.get("/"+this.origin+"/list",{headers:{
        token:"AKIA4VVR7RPQYTILT3MO LXYAbeTX6zwfoCdGh4LiAZVEjPwEMvC6ICEBSnDi us-east-1 cloudin-bucket"
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