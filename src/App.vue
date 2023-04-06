<template>
  <router-view />
</template>

<style src="./assets/tailwind.css">
</style>

<script>
export default {
  mounted(){
    const eventSource = new EventSource('http://localhost:5000/listen');
      eventSource.addEventListener('message', (event) => {
        console.log(event)
      });
  }
}
</script>
