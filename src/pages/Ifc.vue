<template>
  <div>
    <input type="file" name="load" id="file-input" />
    <canvas ref="threeCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const threeCanvas = ref()
import { AmbientLight, AxesHelper, DirectionalLight, GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { IFCLoader } from 'web-ifc-three/IFCLoader'

//Creates the Three.js scene
const scene = new Scene()

//Object to store the size of the viewport
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
}
//Creates the camera (point of view of the user)
const aspect = size.width / size.height
const camera = new PerspectiveCamera(75, aspect)
camera.position.z = 15
camera.position.y = 13
camera.position.x = 8

//Creates the lights of the scene
const lightColor = 0xffffff

const ambientLight = new AmbientLight(lightColor, 0.5)
scene.add(ambientLight)

const directionalLight = new DirectionalLight(lightColor, 1)
directionalLight.position.set(0, 10, 0)
directionalLight.target.position.set(-5, 0, 0)
scene.add(directionalLight)
scene.add(directionalLight.target)

const setCanvas = () => {
  //Sets up the renderer, fetching the canvas of the HTML
  const canvas = threeCanvas.value
  console.log(threeCanvas.value)
  const renderer = new WebGLRenderer({
    canvas: canvas,
    alpha: true,
  })

  renderer.setSize(size.width, size.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  //Creates grids and axes in the scene
  const grid = new GridHelper(50, 30)
  scene.add(grid)

  const axes = new AxesHelper()
  axes.material.depthTest = false
  axes.renderOrder = 1
  scene.add(axes)

  //Creates the orbit controls (to navigate the scene)
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.target.set(-2, 0, 0)

  //Animation loop
  const animate = () => {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  animate()

  //Adjust the viewport to the size of the browser
  window.addEventListener('resize', () => {
    size.width = window.innerWidth
    size.height = window.innerHeight
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height)
  })

  // Sets up the IFC loading
  const ifcLoader = new IFCLoader()
  ifcLoader.ifcManager.setWasmPath('/wasm/')
  const input = document.getElementById('file-input')
  input.addEventListener(
    'change',
    async (changed) => {
      const file = changed.target.files[0]
      var ifcURL = URL.createObjectURL(file)
      const ifcModel = await ifcLoader.loadAsync(ifcURL)
      scene.add(ifcModel)
    },
    false
  )
}
onMounted(() => {
  setCanvas()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  overflow: hidden;
}

#three-canvas {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}

#file-input {
  z-index: 1;
  position: absolute;
}
</style>
