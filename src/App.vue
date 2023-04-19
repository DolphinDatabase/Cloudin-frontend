<template>
  <router-view />
</template>

<style src="./assets/tailwind.css">
</style>

<script>
import notify from '@/utils/notification';

export default {
  mounted(){
    this.$store.dispatch("fetchConfig")
    const eventSource = new EventSource('http://localhost:5000/listen');
      eventSource.addEventListener('newTransaction', (event) => {
        console.log("new Transaction")
        var data = JSON.parse(event.data.replaceAll("'",'"'))
        notify({icon:data.transaction.status,title:"Transação em andamento",text:""})
        this.$store.commit("newTransaction",data)
      });
      eventSource.addEventListener('updateTransaction', (event) => {
        console.log("update Transaction")
        var data = JSON.parse(event.data.replaceAll("'",'"'))
        var text = ""
        if(data.transaction.status=="Erro"){
          text="Erro na transação"
        }else{
          text="Transação concluída com sucesso"
        }
        notify({icon:data.transaction.status,title:text,text:""})
        this.$store.commit("updateTransaction",data)
      });
  }
}
</script>
