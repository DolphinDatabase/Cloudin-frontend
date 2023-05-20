<template>
  <div class="flex flex-col">
    <div class="font-bold">
      <p class="text-sm md:text-base">
        Configure suas transferências
      </p>
    </div>
    <div class="flex flex-col">
      <div>
        <card-component>
          <span>
            <p class="mr-24">Tempo da pesquisa recorrente </p>
          </span>
          <input class="bg-transparent border-b-2 ml-12" type="number" />
          <button type="button" class="bg-green-500 px-5 text-white-100 rounded-lg ml-[350px]">OK</button>
        </card-component>
      </div>
      <div>
        <card-component>
          <span>
            <p class="mr-[157px]">Quantidade de banda</p>
          </span>
          <input type="range" min="0" max="100" value="100" class="slider ml-12 mr-[27px]" id="myRange" />
          <button type="button" class="bg-green-500 px-5 text-white-100 rounded-lg ml-[220px]">OK</button>
        </card-component>
      </div>
      <div>
        <card-component>
          <span>
            <p class="mr-16">Tempo utilizado nas transferências</p>
          </span>
          <input class="bg-transparent border-b-2 ml-12" type="number" />
          <button type="button" class="bg-green-500 px-5 text-white-100 rounded-lg ml-[350px]">OK</button>
        </card-component>
      </div>
      <div />
    </div>
  </div>
</template>
<script>
import CardComponent from '@/components/cards/CardComponent.vue'
export default {
  name: 'SettingsPage',
  components: {
    CardComponent,
  }
}
</script>

<style scoped>
span {
  border-right: 2px solid gray;
}

.slidecontainer {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  margin-top: 8px;
  width: 30%;
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