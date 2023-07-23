<template>
  <AppHeader class="header" />
  <div class="board">
    <div class="container">
      <h1>Thanks for registering!</h1>
      <p>
        Please confirm your email to finishing registering:
        {{ $route.query.email }}
      </p>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>
