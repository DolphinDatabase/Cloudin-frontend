<template>
    <div class="search-field">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
  
      <input class="outline  hover:outline-none" v-model="searchTerm" @input="updateSearchTerm" type="text" placeholder="buscar... ">
      
    </div>
    <div>
      <div v-for="div in filteredDivs" :key="div.id" class="test" @click="handleClick">
        {{ div.content }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FiltroTesteIcon',
    data() {
      return {
        searchTerm: '',
        divs: [
          { id: 1, content: 'Renata' },
          { id: 2, content: 'Rodrigo' },
          { id: 3, content: 'Luis' },
          { id: 4, content: 'Bebe' },
          { id: 5, content: 'Vitor' },
          { id: 6, content: 'Joyce' },
        ],
      };
    },
    computed: {
      filteredDivs() {
        if (!this.searchTerm) return this.divs;
  
        const searchTerm = this.searchTerm.toLowerCase();
  
        return this.divs.filter(div => {
          const content = div.content.toLowerCase();
          return content.includes(searchTerm);
        });
      },
    },
    methods: {
      updateSearchTerm() {
        this.$emit('update:search', this.searchTerm);
      },
      handleClick() {
        // código a ser executado quando a div for clicada
      },
    },
  };
  </script>
  
  <style>
  .search-field{
    display: flex;
    border: solid 1px;
    width: 200px;
    border-radius: 3px;
  }
  .search-field input{
    border: none;
    outline: none;
  }
  .search-field svg{
    width: 40px;
    color: rgb(95, 91, 91);
  }
  </style>
  