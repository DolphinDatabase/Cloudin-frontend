<template>
  <div class="p-10">
    <div class="relative search-field">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="absolute z-10 w-6 h-6 left-3 top-3 text-gray-600"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        @input="onSearch($event)"
        type="text"
        class="border-2 pl-10 pr-3 py-2 rounded-lg w-full"
        placeholder="pesquisar..."
      />
      <!-- <input type="checkbox" @click="selectAllRows" :checked="selectedRows.length === rows.length" />
      Esse input adicina um check box na caixa de pesqua -->
    </div>

    <table class="border-collapse border border-black border-2">
      <thead>
        <tr>
          <th class="border border-black p-2">
            <input type="checkbox" @click="selectAllRows" :checked="selectedRows.length === rows.length" />
          </th>
          <th class="border border-black border-2 p-2" v-for="(column, index) in columns" :key="index" @click="sortRecords(index)">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td class="border border-black border-2 p-2">
            <input type="checkbox" :value="index" v-model="selectedRows" />
          </td>
          <td class="border border-black border-2 p-2">
            {{ row[1] }}
          </td>
          <td class="border border-black border-2 p-2" v-for="(rowItem, itemIndex) in row.slice(2)" :key="itemIndex">
            {{ rowItem }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
 const performSearch = (rows, term) => {
  const results = rows.filter((row) => {
    for (const item of row) {
      if (item.toString().toLowerCase().includes(term.toLowerCase())) {
        return true;
      }
    }
    return false;
  });
  return results;
};

  export default {
    name: "TableSearch",
    data() {
      return {
        term: "",
        rawRows: [
          ["", "Monoj", "24", "Software Developer", "1997"],
          ["", "Renata", "32", "Analista", "1990"],
          ["", "Bea", "18", "Dev", "2005"],
          ["", "Pedro", "20", "não sei", "2003"],
          ["", "Luis", "11", "Estudante", "2011"],
          ["", "Rodrigo", "33", "Empresario", "1990"],
        ],
        rows: [],
        columns: ["Name", "Age", "Profession", "Year of Birth"],
        sortIndex: null,
        sortDirection: null,
        selectedRows: [],
      };
    },
    methods: {
      // Esse método é usado para ordenar as linhas da tabela de acordo com o índice passado como parâmetro. 
      // Ele verifica se a tabela já está sendo ordenada por esse índice e, em caso afirmativo, inverte a direção de classificação. 
      // Caso contrário, ele define a direção como ascendente. 
      // Em seguida, ordena as linhas com base na direção atual de classificação e atualiza as linhas exibidas na tabela.
      sortRecords(index) {
        if (this.sortIndex === index) {
          switch (this.sortDirection) {
            case null:
              this.sortDirection = "asc";
              break;
            case "desc":
              this.sortDirection = null;
              break;
          }
        } else {
          this.sortDirection = "asc";
        }
  
        this.sortIndex = index;
  
        if (!this.sortDirection) {
          this.rows = performSearch(this.rawRows, this.term);
          return;
        }
  
        his.rows = this.rows.sort((rowA, rowB) => {
          if (this.sortDirection === "desc") {
            return rowB[index].localeCompare(rowA[index]);
          }
          return rowA[index].localeCompare(rowB[index]);
        });
      },
      // Esse método é usado para filtrar as linhas da tabela com base no valor inserido na caixa de pesquisa. 
      // Quando a caixa de pesquisa é alterada, o método é acionado e atualiza o valor de pesquisa na propriedade term. 
      // Em seguida, chama o método filterRows() para filtrar as linhas com base no novo valor de pesquisa.
      onSearch (e) {
             this.term = e.target.value;
             this.rows = performSearch(this.rawRows, this.term);
        }
    },

    // Esse método 
    // é executado após a criação do componente e atualiza as 
    // linhas exibidas para exibir uma cópia do valor original de rawRows
    mounted () {
        this.rows = [...this.rawRows]
    },
    methods: {
  sortRecords(index) {
    // código existente para ordenação
  },
  onSearch(e) {
    // código existente para filtragem
    this.term = e.target.value;
    this.filterRows();
  },

  // Esse método é usado para filtrar as linhas da tabela com base no valor de pesquisa atual. 
  // Se a caixa de pesquisa estiver vazia, ele atualiza as linhas exibidas para exibir todas as linhas da tabela. 
  // Caso contrário, ele filtra as linhas da tabela e atualiza as linhas exibidas na tabela.
  filterRows() {
    if (this.term === "") {
      this.rows = [...this.rawRows];
      return;
    }

    const termLower = this.term.toLowerCase();
    this.rows = this.rawRows.filter((row) => {
      for (const cell of row) {
        if (cell.toLowerCase().includes(termLower)) {
          return true;
        }
      }
      return false;
    });
  },

  // Esse método é usado para selecionar todas as linhas da tabela ou desmarcar todas as linhas já selecionadas. 
  // Se todas as linhas já estiverem selecionadas, o método desmarca todas elas. 
  // Caso contrário, o método seleciona todas as linhas
  selectAllRows() {
    if (this.selectedRows.length === this.rows.length) {
      this.selectedRows = [];
    } else {
      this.selectedRows = [...this.rows.keys()];
    }
  }
},
  }
  </script>

<style scoped>
  .search-field{
      display: flex;
      border: solid 2px;
      width: 420px;
      border-radius: 3px;
      height: 25px;
  }
  .search-field input{
      border: none;
      outline: none;
  }
  .search-field svg{
      width: 15px;
      color: rgb(95, 91, 91);
      margin-top: -15px;
      
  }
</style>
  