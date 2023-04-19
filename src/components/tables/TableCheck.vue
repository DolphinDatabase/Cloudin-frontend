<template>
  <div class="card">
    <div class="card-body">
      <div class="m-3 flex justify-end">
        <div class="relative search-field">
          <MagnifyingGlassIcon class="absolute z-10 w-4 h-4 left-2 top-[10px] text-gray-600" />
          <input
            v-model="search"
            type="text"
            class="border-2 pl-8 py-1 rounded-md"
            placeholder="Buscar"
            @input="onSearch()"
          >
        </div>
      </div>
      <table class="w-[530px] flex flex-col">
        <thead>
          <tr class="flex border-b-2 border-black">
            <th class="mr-56">
              Nome do arquivo
            </th>
            <!-- <th>Tamanho (kb)</th> -->
          </tr>
        </thead>
        <tbody class="block h-[300px] overflow-auto">
          <tr
            v-for="d in filtred"
            :key="d.id"
          >
            <td>
              <input
                v-model="selected"
                type="radio"
                :value="d.id"
              >
            </td>
            <td> {{ d.name }}</td>
            <!-- <td>{{ (d.size) ? d.size : "-" }}</td> -->
          </tr>
        </tbody>
      </table>
      <!-- </div> -->
    </div>
  </div>
</template>
    
<script>
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid';
export default {
  name: 'TableCheck',
  components:{
    MagnifyingGlassIcon
  },
  props: {
    data: Array
  },
  data() {
    return {
      select_all: false,
      selected: [],
      search: "",
      filtred: []
    }
  },
  created() {
    this.filtred = this.data
  },
  methods: {
    select() {
      this.selected = [];
      if (!this.select_all) {

        for (let i in this.data) {
          this.selected.push(this.data[i].id);

        }
      }
    },
    // Esse método é usado para filtrar as linhas da tabela com base no valor inserido na caixa de pesquisa. 
    // Quando a caixa de pesquisa é alterada, o método é acionado e atualiza o valor de pesquisa na propriedade term. 
    // Em seguida, chama o método filterRows() para filtrar as linhas com base no novo valor de pesquisa.
    onSearch() {
      this.filtred = []
      this.data.forEach(l => {
        if (l.name.toLowerCase().includes(this.search.toLowerCase())) {
          this.filtred.push(l)
        }
      })
      console.log(this.filtred)
    }
  }
}
</script>

<!-- <style scoped>
thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;/* even columns width , fix width of table too*/
}
thead {
    width: calc( 100% - 1em )/* scrollbar is average 1em/16px width, remove it from thead width */
}
table {
    width: 400px;
}
</style> -->