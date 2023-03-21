
import NavigationBar from './components/NavigationBar.vue';

<template>
  <nav>
    <router-link to="/">
      Home
    </router-link> |
    <router-link to="/transaction">
      Transactions
    </router-link>
  </nav>
  <router-view />
</template>

<style src="./assets/tailwind.css">
</style>
