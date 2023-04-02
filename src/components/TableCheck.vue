<template>
  <div class="card">
    <div class="card-body">
      <div class="p-10">
        <div class="relative search-field">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="absolute z-10 w-6 h-6 left-3 top-3 text-gray-600">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input @input="onSearch()" v-model="this.search" type="text" class="border-2 pl-10 pr-3 py-2 rounded-lg w-full"
            placeholder="pesquisar..." />

        </div>
      </div>
      <table class="mt-1 w-[100%]">
        <thead class="border-solid border-b-2 border-black">
          <tr>
            <th>
              <input v-model="select_all" type="checkbox" @click="select">
            </th>
            <th>Nome do arquivo</th>
            <th>Tamanho</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in this.filtred" :key="d.id">
            <td>
              <input v-model="selected" type="checkbox" :value="d.id">
            </td>
            <td> {{ d.name }}</td>
            <td>{{ (d.size) ? d.size : "-" }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'TableCheck',
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
    