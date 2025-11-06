<script setup>
import { RouterView } from 'vue-router'
import PlanetHeader from './components/PlanetHeader.vue';
</script>

<template>
  <header>
    <div class="wrapper">
      <PlanetHeader></PlanetHeader>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
