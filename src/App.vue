<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->

<script setup>
import '@/assets/styles.css'
// document.addEventListener('keydown', (event) => {
//   // console.log(event)
//   if (event.code === 'NumpadEnter') {
//     console.log('num pad enter')
//     event.preventDefault()
//     return false
//   }
// })
</script>

<template>
  <div class="router">
    <router-view />
  </div>
</template>

<style>
.router {
  height: 100%;
}
</style>
