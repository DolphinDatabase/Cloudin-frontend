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
          <input
            v-model="tempoRecorrente"
            class="bg-transparent border-b-2"
            type="number"
          >
          <select
            v-model="selectedTimeSearch"
            class="bg-transparent border-2 border-slate-200 rounded-md px-4"
          >
            <option
              value=""
              disabled
            >
              Selecione uma opção
            </option>
            <option
              v-for="time in times"
              :key="time.id"
            >
              {{ time.tempo }}
            </option>
          </select>
          <button
            type="button"
            class="bg-green-500 px-5 text-white-100 rounded-lg w-24"
            @click="setTempoRecorrente()"
          >
            OK
          </button>
        </div>
      </div>
      <div class="rounded-md border-slate-200 border shadow ">
        <div class="grid-container items-center">
          <p>Quantidade de banda</p>
          <span class="tracinho" />
          <input
            v-model="sliderValue"
            type="range"
            min="0"
            max="100"
            class="slider"
          >
          <label>{{ valueLabel }}</label>
          <button
            type="button"
            class="bg-green-500 px-5 text-white-100 rounded-lg w-24"
            @click="setBanda()"
          >
            OK
          </button>
        </div>
      </div>
      <div class="rounded-md border-slate-200 border shadow ">
        <div class="grid-container items-center">
          <p class="">
            Tempo de transferências
          </p>
          <span class="tracinho" />
          <input
            class="bg-transparent border-b-2"
            type="number"
          >
          <select
            v-model="selectedTimeTransfer"
            class="bg-transparent border-2 border-slate-200 rounded-md px-4"
          >
            <option
              value=""
              disabled
            >
              Selecione uma opção
            </option>
            <option
              v-for="time in times"
              :key="time.id"
            >
              {{ time.tempo }}
            </option>
          </select>
          <button
            type="button"
            class="bg-green-500 px-5 text-white-100 rounded-lg w-24"
            @click="setTempoTransfer()"
          >
            OK
          </button>
        </div>
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
      tempoRecorrente: '',
      selectedTimeSearch: '',
      selectedTimeTransfer:'',
      times: [
        {id: 1, tempo: 'segundos'},
        {id: 3, tempo: 'minutos'},
        {id: 4, tempo: 'horas'},
      ],
      sliderValue: '100'
    }
  },
  computed: {
    valueLabel() {
      const percentage = Math.round((this.sliderValue / 100) * 100)
      return `Valor: ${percentage}%`;
    }
  },
  async created() {
    const res = await api.get("/job")
    this.tempoRecorrente = res.data.job
  },
  methods: {
    setTempoRecorrente() {
      let tempo = 0;
      if (this.selectedTimeSearch == 'segundos'){
        tempo = this.tempoRecorrente
      } else if (this.selectedTimeSearch == 'minutos'){
        tempo = this.tempoRecorrente * 60
      } else if (this.selectedTimeSearch == 'horas'){
        tempo = this.tempoRecorrente *  3.600
      } else {
        alert('Selecione uma opção válida');
      } 
      api.post("/job", { "job": tempo })
    },
    setTempoTransfer() {
      let tempo = 0;
      if (this.selectedTimeTransfer == 'segundos'){
        tempo = this.tempoRecorrente
      } else if (this.selectedTimeTransfer == 'minutos'){
        tempo = this.tempoRecorrente * 60
      } else if (this.selectedTimeTransfer == 'horas'){
        tempo = this.tempoRecorrente *  3.600
      } else {
        alert('Selecione uma opção válida');
      } 
      
      console.log(tempo)
    },
    setBanda() {
      console.log(this.sliderValue)
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 2fr 1fr;
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