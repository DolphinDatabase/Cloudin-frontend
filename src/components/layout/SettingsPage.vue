<template>
  <div class="flex flex-col">
    <div class="font-bold">
      <p class="text-sm md:text-base mb-4">
        Configure suas transferências
      </p>
    </div>
    <div class="flex flex-col gap-8">
      <div class="rounded-md border-slate-200 border shadow ">
        <div class="grid-container items-center">
          <p>
            Tempo da pesquisa recorrente
          </p>
          <span class="tracinho" />
          <input v-model="config.JOB_TIME" class="bg-transparent border-b-2" type="number">
          <select v-model="selectedTimeSearch" class="bg-transparent border-2 border-slate-200 rounded-md px-4">
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option v-for="time in times" :key="time.id">
              {{ time.tempo }}
            </option>
          </select>
        </div>
      </div>
      <div class="rounded-md border-slate-200 border shadow ">
        <div class="grid-container items-center">
          <p>Quantidade de banda</p>
          <span class="tracinho" />
          <input v-model="this.config.BAND" type="range" min="0" max="100" class="slider">
          <label>{{ valueLabel }}</label>
        </div>
      </div>
      <div class="rounded-md border-slate-200 border shadow ">
        <div class="grid-container items-center">
          <p class="">
            Tempo de transferências
          </p>
          <span class="tracinho" />
          <input v-model="config.TRANSFER_TIME" class="bg-transparent border-b-2" type="number">
          <select v-model="selectedTimeTransfer" class="bg-transparent border-2 border-slate-200 rounded-md px-4">
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option v-for="time in times" :key="time.id">
              {{ time.tempo }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex">
        <button type="button" class=" bg-green-500 p-2 text-white-100 rounded-lg w-32" @click="setConfig()">
          Configurar
        </button>
      </div>
    </div>
    <div />
  </div>
</template>
<script>
import api from '@/services/api'
export default {
  name: 'SettingsPage',
  data() {
    return {
      config: '',
      selectedTimeSearch: '',
      selectedTimeTransfer: '',
      times: [
        { id: 1, tempo: 'segundos' },
        { id: 3, tempo: 'minutos' },
        { id: 4, tempo: 'horas' },
      ]
    }
  },
  computed: {
    valueLabel() {
      const percentage = Math.round((this.config.BAND / 100) * 100)
      return `Valor: ${percentage}%`;
    },
  },
  async created() {
    const res = await api.get("/job")
    this.config = res.data

    const storedTimeSearch = localStorage.getItem('selectedTimeSearch')
    if (storedTimeSearch == 'minutos') {
      this.config.JOB_TIME = this.config.JOB_TIME * 60
    } else if (storedTimeSearch == 'horas') {
      this.config.JOB_TIME = this.config.JOB_TIME * 3600
    }
    const storedTimeTransfer = localStorage.getItem('selectedTimeTransfer')
    if (storedTimeTransfer == 'minutos') {
      this.config.TRANSFER_TIME = this.config.TRANSFER_TIME * 60
    } else if (storedTimeTransfer == 'horas') {
      this.config.TRANSFER_TIME = this.config.TRANSFER_TIME * 3600
    }
  },
  mounted() {
    const storedTimeSearch = localStorage.getItem('selectedTimeSearch')
    this.selectedTimeSearch = storedTimeSearch || 'segundos'

    const storedTimeTransfer = localStorage.getItem('selectedTimeTransfer')
    this.selectedTimeTransfer = storedTimeTransfer || 'segundos'
  },
  methods: {
    setConfig() {
      let tempoPesquisa = 0;
      if (this.selectedTimeSearch == 'segundos') {
        tempoPesquisa = this.config.JOB_TIME
      } else if (this.selectedTimeSearch == 'minutos') {
        tempoPesquisa = this.config.JOB_TIME / 60
      } else if (this.selectedTimeSearch == 'horas') {
        tempoPesquisa = this.config.JOB_TIME / 3600
      }

      let tempoTransfer = 0
      if (this.selectedTimeTransfer == 'segundos') {
        tempoTransfer = this.config.TRANSFER_TIME
      } else if (this.selectedTimeTransfer == 'minutos') {
        tempoTransfer = this.config.TRANSFER_TIME / 60
      } else if (this.selectedTimeTransfer == 'horas') {
        tempoTransfer = this.config.TRANSFER_TIME / 3600
      }

      console.log(tempoTransfer)
      alert('Configurações aplicadas com sucesso!')

      api.post("/job", { "job": tempoPesquisa, "band": this.config.BAND, "transfer": tempoTransfer })
      localStorage.setItem('selectedTimeSearch', this.selectedTimeSearch)
      localStorage.setItem('selectedTimeTransfer', this.selectedTimeTransfer)
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr;
  gap: 6px;
  padding: 10px;
}

.grid-container * {
  text-align: center;
  justify-self: start;
}

.grid-container p {
  padding-left: 24px;
}

.tracinho {
  border-right: solid 2px gray;
  width: 45%;
  height: 100%;
}

.grid-container input {
  width: 80%;
  justify-self: center;
}

.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  margin-top: 8px;
  height: 5px;
  border-radius: 2px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #96DA84;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #04AA6D;
  cursor: pointer;
}
</style>