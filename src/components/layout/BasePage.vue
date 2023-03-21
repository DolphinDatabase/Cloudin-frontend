<template>  
  <div id="page">
    <navigation-bar />
    <div class="2xl:container mx-auto space-y-6">
      <div class="px-6 lg:px-96">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';

export default {
    name: "BasePage",
    components: { NavigationBar }
}
</script>