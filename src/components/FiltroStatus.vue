<!-- Criar um componente que liste as transferências que deseja filtrar -->
<!-- Adicionar uma propriedade de estado ao seu componente para armazenar o status da transferência que deseja filtrar -->

<template>
    
    <div>
        
      <label>Status:</label>
      <select v-model="transferStatus">
        <option value="concluído">Concluído</option>
        <option value="pendente">Pendente</option>
        <option value="falha">Falha</option>
      </select>
  
      <ul>
        <li v-for="transfer in filteredTransferList" :key="transfer.id">
          {{ transfer.status }} - {{ transfer.name }}
        </li>
      </ul>
    </div>
  </template>

<script>

export default {
    data() {
      return {
        transferStatus: 'concluído',
        transferList: [],
        error: null,
      };
    },
    mounted() {
      this.fetchTransferList();
    },
    methods: {
      fetchTransferList() {
        // Aqui você pode utilizar a API do Google Drive para buscar a lista de transferências
        // que foram realizadas. A resposta da API deve ser atribuída à propriedade transferList.
        // Você pode tratar qualquer erro usando a propriedade error.
      },
      filterTransferList() {
        return this.transferList.filter((transfer) => {
          return transfer.status === this.transferStatus;
        });
      }
    },
    computed: {
      filteredTransferList() {
        return this.filterTransferList();
      }
    }
  };
</script>