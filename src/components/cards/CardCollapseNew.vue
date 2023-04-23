<template>
  <div class="w-[100%] mb-6">
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="shadow flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium">
        <div class="flex gap-2 items-center">
          <ExclamationCircleIcon class="h-5 w-5" />
          <p class="font-bold">Preencha os campos cuidadosamente</p>
        </div>
        <ChevronUpIcon :class="open ? 'rotate-180 transform' : ''" class="h-5 w-5 text-black" />
      </DisclosureButton>
      <DisclosurePanel class="px-12 pt-4 pb-4 text-sm bg-gray-100">
        <div class="flex justify-between mb-2">
          <div>
            <p>De:</p>
            <DropDown :list="[{ nome: 'Google' }, { nome: 'S3' }]" @onSelect="(e) => { origin = e }" />
          </div>
          <ArrowSmallRightIcon />
          <div>
            <p>Para:</p>
            <DropDown :list="[{ nome: 'Google' }, { nome: 'S3' }]" @onSelect="(e) => { destiny = e }" />
          </div>
        </div>
        <div class="flex justify-center">
          <button class="bg-green-500 text-white-100 py-2 px-4 rounded flex gap-2" @click="chooseFiles()">
            <DocumentMagnifyingGlassIcon class="w-5 h-5"/>
            Escolher arquivos
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <!-- <img src="@/assets/emAndamento.svg">
    <img src="@/assets/erro.svg"> -->
  </div>
  <ModalComponent title="Selecione Arquivos para a transferência" :open="modal" @closeModal="() => { modal = false }"
    @submitData="() => { submitTransaction() }">
    <TableCheck ref="table" :data="this.files" />
  </ModalComponent>
</template>
<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import ModalComponent from '@/components/Modal.vue'
import { ChevronUpIcon,  } from '@heroicons/vue/20/solid'
import { ExclamationCircleIcon, DocumentMagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import DropDown from '@/components/Dropdown.vue'
import api from '@/services/api'
import TableCheck from '@/components/tables/TableCheck.vue'

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
    ExclamationCircleIcon,
    DocumentMagnifyingGlassIcon
  },
  data() {
    return {
      origin: '',
      destiny: '',
      status: '',
      modal: false,
      selected: [],
      files: [],
      showDataDiv: true,
      tokenHandler: {
        "google": () => { return this.$store.getters.googleToken },
        "s3": () => { return this.$store.getters.s3Token },
      }
    }
  },
  emits: ["newTransaction", "updateStatus"],
  methods: {
    submitTransaction() {
      this.modal = false
      var selected = []
      this.$refs.table.selected.forEach(file => {
        let s = this.files.filter(
          (f) => { return f.id == file }
        )
        selected.push({ file_id: s[0].id, file_name: s[0].name })
      });

      var data = {
        origin: this.origin,
        destiny: this.destiny,
        files: selected
      }

      var headers = {
        headers: {
          origin_token: this.tokenHandler[this.origin](),
          destiny_token: this.tokenHandler[this.destiny](),
          application: this.$store.getters.id
        }
      }

      this.$emit("newTransaction",{ origin:this.origin, destiny:this.destiny, status:"Em andamento", data: data, headers: headers })
    },
    
    listFiles() {
      api.get("/" + this.origin + "/list", {
        headers: {
          token: this.tokenHandler[this.origin]()
        }
      }).then((res) => {
        this.files = res.data.result
        this.modal = true
      })
    },

    chooseFiles() {
      if (!this.origin || !this.destiny) {
        console.error("no drives selected")
      } else {
        this.listFiles()
      }
    }
  }
}
</script>
