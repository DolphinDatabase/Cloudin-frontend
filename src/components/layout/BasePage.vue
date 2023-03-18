<template>  
  <div id="page">
    <navigation-bar />
    <div class="2xl:container mx-auto space-y-6">
      <div class="h-16 border-b border-gray-300/40 dark:border-gray-700" />
      <div class="px-6 lg:px-12">
        <div
          class="h-96 flex justify-center items-center rounded-2xl border border-dashed border-gray-300/40 dark:border-gray-700"
        >
          <span class="text-gray-500 dark:text-gray-200" ><slot></slot></span>
        </div>
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