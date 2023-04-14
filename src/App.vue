<template>
  <router-view />
</template>

<style src="./assets/tailwind.css">
</style>

<script>
export default {
  mounted(){
    const eventSource = new EventSource('http://localhost:5000/listen');
      eventSource.addEventListener('newTransaction', (event) => {
        console.log("new Transaction")
        console.log(event)
      });
      eventSource.addEventListener('updateTransaction', (event) => {
        console.log("update Transaction")
        console.log(event)
      });
  }
}
</script>
