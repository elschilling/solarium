<script setup>
import '@/assets/styles.css'
</script>

<template>
  <div class="router">
    <router-view />
  </div>
</template>

<style scoped>
.router {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
