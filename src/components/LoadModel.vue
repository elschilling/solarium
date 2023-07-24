<template>
  <div v-show="model" :id="mode" class="canvas-container">
    <div id="gui-container"></div>
    <div id="progress-bar">
      <span class="progress-value">0%</span>
      <span class="progress-status"></span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  mode: String,
  model: {
    type: Object,
  },
  params: {
    type: Object,
  },
})

import { ref, watch } from 'vue'
// const fullModelURL = ref()
watch(
  () => props.model,
  (model) => {
    if (document.querySelector('canvas')) {
      document.querySelector('canvas').remove()
      document.getElementById('gui-container').remove()
      document.querySelector('.canvas-container').innerHTML += '<div id="gui-container"></div>'
    }
    main(model).catch((err) => {
      console.log(err)
    })
  }
)

import { World } from '../sunposition/World/World'

async function main(model) {
  // Get a reference to the container element
  const container = document.querySelector('#' + props.mode)

  // 1. Create an instance of the World app
  const world = new World(container, props.params)

  // Complete async tasks
  await world.init(model)

  // 2. Render the scene
  world.resize()
  world.start()
}
</script>

<style>
#edit {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
#view {
  position: absolute;
  width: 100%;
  height: 100%;
}
#gui-container {
  position: absolute;
  right: 0;
}
.canvas-container {
  position: relative;
}
#progress-bar {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  background: conic-gradient(#ffce00 3.6deg, transparent 0deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease-out;
  pointer-events: none;
}
#progress-bar::before {
  content: '';
  position: absolute;
  height: 210px;
  width: 210px;
  border-radius: 50%;
  background: black;
}
.progress-value,
.progress-status {
  position: relative;
  color: white;
  font-size: 20px;
  font-weight: 100;
}
</style>
