<template>
  <div class="flex flex-col">
    <div class="font-bold">
      <p class="text-sm md:text-base">
        Configure suas transferências
      </p>
    </div>
    <div class="flex flex-col gap-8">
      <div class="rounded-md border-slate-200 border shadow ">
        <div class="grid-container items-center">
          <p>Tempo de pesquisa recorrente</p>
          <div class="flex gap-12">
            <input class="bg-transparent border-b-2" type="number">
            <select class="bg-transparent border-2 border-slate-200 rounded-md px-4 mr-5">
              <option>segundos</option>
              <option>minutos</option>
              <option>horas</option>
            </select>
          </div>
          <button type="button" class="bg-green-500 px-5 text-white-100 rounded-lg w-24">
            OK
          </button>
        </div>
      </div>
      <div class="rounded-md border-slate-200 border shadow ">
        <div class="grid-container items-center">
          <p class="mr-9">Quantidade de banda</p>
          <div class="flex gap-11">
            <input id="myRange" type="range" min="0" max="100" value="100" class="slider">
            <label>Valor: 100%</label>
          </div>
          <div class="pl-14">
            <button type="button" class="bg-green-500 px-5 text-white-100 rounded-lg w-24">
              OK
            </button>
          </div>
        </div>
      </div>
      <div class="rounded-md border-slate-200 border shadow ">
        <div class="grid-container items-center">
          <p class="mr-10">Tempo de transferências</p>
          <div class="flex gap-12">
            <input class="bg-transparent border-b-2" type="number">
            <select class="bg-transparent border-2 border-slate-200 rounded-md px-4 mr-5">
              <option>segundos</option>
              <option>minutos</option>
              <option>horas</option>
            </select>
          </div>
          <button type="button" class="bg-green-500 px-5 text-white-100 rounded-lg w-24">
            OK
          </button>
        </div>
      </div>
    </div>
    <div />
  </div>
</template>
<script>
export default {
  name: 'SettingsPage',
  components: {
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: 6px;
  padding: 10px;
}

.grid-container>div {
  text-align: center;
}

.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  margin-top: 8px;
  width: 55%;
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