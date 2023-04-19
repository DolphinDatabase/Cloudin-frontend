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
          <div>
            <p>De:</p>
            <DropDown
              :list="[{ nome: 'Google' }, { nome: 'S3' }]"
              @onSelect="(e) => { origin = e }"
            />
          </div>
          <ArrowSmallRightIcon />
          <div>
            <p>Para:</p>
            <DropDown
              :list="[{ nome: 'Google' }, { nome: 'S3' }]"
              @on-select="(e) => { destiny = e }"
            />
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="bg-green-500 text-white-100 py-2 px-4 rounded flex gap-2"
            @click="chooseFolder()"
          >
            <DocumentMagnifyingGlassIcon class="w-5 h-5" />
            Escolher arquivos
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </div>
  <ModalComponent
    title="Selecione a pasta para a transferência automática"
    :open="modal"
    :origin="origin"
    :destiny="destiny"
    @close-modal="() => { modal = false }"
    @submit-data="() => { submitTransaction() }"
    @next="() => { next() }"
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
  emits: ["newTransaction", "updateStatus"],
  data() {
    return {
      origin: '',
      destiny: '',
      status: '',
      modal: false,
      selected: [],
      files: [],
      showDataDiv: true
    }
  },
  methods: {
    next() {
      

    },
    submitTransaction() {
      this.modal = false
      let selected = []
      this.$refs.table.selected.forEach(file => {
        let s = this.files.filter(
          (f) => { return f.id == file }
        )
        selected.push({ file_id: s[0].id, file_name: s[0].name })
      });

      let data = {
        origin: this.origin,
        destiny: this.destiny,
        files: selected
      }
      let headers = {
        headers: {
          origin_token: "",
          destiny_token: "",
          application: window.localStorage.getItem("id")
        }
      }
      let tokenHandler = {
        "google": () => {
          return this.$store.getters.getGoogleAccessToken
        },
        "s3": () => {
          let s3Auth = JSON.parse(this.$store.getters.getS3Token)
          return `${s3Auth.awsAccessKeyId} ${s3Auth.awsSecretAccessKey} ${s3Auth.awsRegionName} ${s3Auth.s3BucketName}`
        }
      }

      headers.headers.origin_token = tokenHandler[this.origin]()
      headers.headers.destiny_token = tokenHandler[this.destiny]()

      this.$emit("newTransaction",{ origin:this.origin, destiny:this.destiny, status:"Em andamento", data: data, headers: headers })
    },
    async listFolders() {
      let tk = ""
      if (this.origin == "google") {
        tk += this.$store.getters.getGoogleAccessToken
      } else if (this.origin == "s3" ) {
        let s3Auth = JSON.parse(this.$store.getters.getS3Token)
        tk +=  `${s3Auth.awsAccessKeyId} ${s3Auth.awsSecretAccessKey} ${s3Auth.awsRegionName} ${s3Auth.s3BucketName}`
      }
      const res = await api.get("/" + this.origin + "/list/folder", {
        headers: {
          token: tk
        }
      })

      this.files = res.data.result
      this.modal = true
    },
    chooseFolder() {
      if (!this.origin || !this.destiny) {
        console.error("no drives selected")
      } else {
        this.listFolders()
      }
    }
  }
}
</script>
