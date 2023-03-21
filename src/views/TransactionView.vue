<template>
  <div>
    <h1 class="text-green-500">
      Transferências
    </h1>
    <div class="flex justify-between">
      <p>Configure suas transferências e analise os metadados</p>
      <button>+    Adicionar </button>
    </div>
    <Disclosure v-slot="{open}">
      <DisclosureButton class="flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium">
        <span>Preencha os campos cuidadosamente</span>
        <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-black"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-48 pt-4 pb-4 text-sm bg-gray-100">
        <div class="flex justify-between">
          <div>
            <p>De:</p>
            <DropDown
              :list="[{nome:'Google'},{nome:'S3'}]"
              @onSelect="(e)=>{origin = e}"
            />
          </div>
          <ArrowSmallRightIcon />
          <div>
            <p>De:</p>
            <DropDown
              :list="[{nome:'Google'},{nome:'S3'}]"
              @onSelect="(e)=>{destiny = e}"
            />
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="bg-green-500 text-white font-bold py-2 px-4 rounded"
            @click="chooseFiles()"
          >
            Escolher arquivos
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>
<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
import DropDown from '@/components/Dropdown.vue'

export default {
    name: "TransactionView",
    components:{
        Disclosure, 
        DisclosureButton, 
        DisclosurePanel,
        ChevronUpIcon,
        DropDown
    },
    data(){
        return{
            origin:'',
            destiny:''
        }
    },
    methods:{
        teste(param){
            console.log(param)
        },
        chooseFiles(){
            if(this.origin==''||this.origin==null||this.destiny==''||this.destiny==null){
                console.error("no drives selected")
            }else{
                console.log("open Modal")
            }
        }
    }
}
</script>