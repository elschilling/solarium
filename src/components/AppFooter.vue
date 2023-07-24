<template>
  <div class="foot">
    Many thanks to
    <a href="https://vitejs.dev" target="_blank">
      <img src="../assets/logos/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/logos/vue.svg" class="logo" alt="Vue logo" />
    </a>
    <a href="https://threejs.org/" target="_blank" class="three">
      <img src="../assets/logos/three.svg" class="logo" alt="Three logo" />
    </a>
    <a href="https://ifcjs.io/" target="_blank">
      <img src="../assets/logos/ifcjs.png" class="logo" alt="Ifcjs logo" />
    </a>
    <a href="https://supabase.com/" target="_blank">
      <img src="../assets/logos/supabase.svg" class="logo" alt="Supabase logo" />
    </a>
    <a href="https://vercel.com/" target="_blank">
      <img src="../assets/logos/vercel.svg" class="logo" alt="Vercel logo" />
    </a>
    <a href="https://github.com/elschilling/solarium" target="_blank">
      <img src="../assets/logos/github.svg" class="logo three" alt="Github logo" />
    </a>
  </div>
</template>

<style scoped>
.foot {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 20px;
  text-align: center;
  background: black;
}
.logo {
  height: 25px;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 1em #ffce00);
}
.three {
  display: flex;
  padding: 2px;
  border-radius: 50%;
  background: white;
}
</style>

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
