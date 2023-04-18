<template>
  <router-view />
</template>

<style src="./assets/tailwind.css">
</style>

<script>
export default {
  mounted(){
    this.$store.dispatch("fetchConfig")
    const eventSource = new EventSource('http://localhost:5000/listen');
      eventSource.addEventListener('newTransaction', (event) => {
        console.log("new Transaction")
        var data = JSON.parse(event.data.replaceAll("'",'"'))
        this.$store.commit("newTransaction",data)
      });
      eventSource.addEventListener('updateTransaction', (event) => {
        console.log("update Transaction")
        var data = JSON.parse(event.data.replaceAll("'",'"'))
        this.$store.commit("updateTransaction",data)
      });
  }
}
</script>
