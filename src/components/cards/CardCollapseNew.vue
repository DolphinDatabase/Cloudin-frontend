<template>
  <div class="w-[100%] mb-6">
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="shadow flex w-full justify-between rounded-lg px-4 py-2 text-gray-200 text-left text-sm font-medium"
      >
        <div class="flex gap-2 items-center">
          <ExclamationCircleIcon class="h-5 w-5" />
          <p class="font-bold">
            Preencha os campos cuidadosamente
          </p>
        </div>
        <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-black"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-12 pt-4 pb-4 text-sm bg-gray-100">
        <div class="flex justify-between mb-2">
          <DropDown @origin-updated="onOriginUpdated" @destiny-updated="onDestinyUpdated" />
        </div>

        <div class="flex justify-center">
          <button
            class="bg-green-500 text-white-100 py-2 px-4 rounded flex gap-2"
            @click="chooseFolderOrigin()"
          >
            <DocumentMagnifyingGlassIcon class="w-5 h-5" />
            Escolher pastas
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
  <ModalComponent :open="modal">
    <TableFolder
      ref="table"
      :origin="origin"
      :destiny="destiny"
      :origin-data="foldersOrigin"
      :destiny-data="foldersDestiny"
      @close-modal="() => { modal = false }"
      @submit-data="() => {submitTransaction()}"
    />
  </ModalComponent>
</template>
<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import ModalComponent from '@/components/Modal.vue'
import { ChevronUpIcon, } from '@heroicons/vue/20/solid'
import { ExclamationCircleIcon, DocumentMagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import DropDown from '@/components/Dropdown.vue'
import api from '@/services/api'
import TableFolder from '../tables/TableFolder.vue'
export default {
  name: "CardCollapseNew",
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronUpIcon,
    DropDown,
    ModalComponent,
    ExclamationCircleIcon,
    DocumentMagnifyingGlassIcon,
    TableFolder
  },
  emits: ["newTransaction", "updateStatus"],
  data() {
    return {
      origin: '',
      destiny: '',
      status: '',
      modal: false,
      selected: [],
      foldersOrigin: [],
      foldersDestiny: [],
      showDataDiv: true,
      originToken: null,
      destinyToken: null,
      tokenHandler: {
        "google": () => { return this.$store.getters.googleAccessToken },
        "s3": () => { return this.$store.getters.s3Token }
      }
    }
  },
  methods: {
    
    onOriginUpdated(updatedOrigin) {
      this.origin = updatedOrigin.toLowerCase(); // Atualizar origin no componente pai
      console.log("origin");
      console.log(this.origin);
    },
    onDestinyUpdated(updatedDestiny) {
      this.destiny = updatedDestiny.toLowerCase(); // Atualizar destiny no componente pai
      console.log("destiny");
      console.log(this.destiny);
    },

    async submitTransaction() {
      this.modal = false
      this.selectedOrigin = this.$refs.table.selectedOrigin
      this.selectedDestiny = this.$refs.table.selectedDestiny

      let data = {
        origin: this.origin,
        destiny: this.destiny,
        originFolder: this.selectedOrigin,
        destinyFolder: this.selectedDestiny,
        originToken: this.tokenHandler[this.origin](),
        destinyToken: this.tokenHandler[this.destiny]()
      }

      await api.post("/config/", data)
      this.$store.dispatch("fetchConfig")
    },

    listFoldersOrigin() {
      api.get(`/${this.origin}/list/folder`, {
        headers: {
          token: this.tokenHandler[this.origin]()
        }
      }).then((res) => {
        this.foldersOrigin = res.data.result
        this.modal = true
      });
    },

    chooseFolderOrigin() {
      if (!this.origin || !this.destiny) {
        console.error("no drives selected")
      } else {
        this.listFoldersOrigin()
        this.listFoldersDestiny()
      }
    },

    listFoldersDestiny() {
      api.get(`/${this.destiny}/list/folder`, {
        headers: {
          token: this.tokenHandler[this.destiny]()
        }
      }).then((res) => {
        this.foldersDestiny = res.data.result
        this.modal = true
      });
    }

  }
}
</script>
