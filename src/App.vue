<script setup>
import { RouterView } from 'vue-router'
import PlanetHeader from './components/PlanetHeader.vue';
</script>

<template>
  <section>
    <div class="wrapper">
      <PlanetHeader></PlanetHeader>
    </div>
  </section>

  <RouterView />
</template>

<style scoped>

</style>
