import { loadHouse } from './components/house/house.js'
import { createBirdCamera } from './components/birdCamera.js'
import { createFirstPersonCamera } from './components/firstPersonCamera.js'
import { createBase } from './components/base.js'
import { createLights } from './components/lights.js'
import { createScene } from './components/scene.js'
import { createDirectionalLightHelper, createShadowCameraHelper, createAxesHelper } from './components/helpers.js'
import { createSunSphere } from './components/sunSphere.js'

import { createGUI } from './systems/gui.js'
import { createControls } from './systems/controls.js'
import { createRenderer } from './systems/renderer.js'
import { Resizer } from './systems/Resizer.js'
import { Loop } from './systems/Loop.js'
import { SunPath } from './systems/SunPath.js'
import { DynamicSky } from './systems/DynamicSky.js'
import { createPlayer } from './systems/player.js'

const skyControl = {
  turbidity: 10,
  rayleigh: 0.425,
  mieCoefficient: 0.012,
  mieDirectionalG: 1,
  exposure: 6.99,
}

const cameraControl = {
  firstPerson() {
    activeCamera = firstPersonCamera
    loop.camera = firstPersonCamera
    resizer.camera = firstPersonCamera
    resizer.onResize()
  },
  birdView() {
    console.log('button bug')
    activeCamera = birdCamera
    loop.camera = birdCamera
    resizer.camera = birdCamera
    resizer.onResize()
  },
}

let activeCamera, birdCamera, firstPersonCamera
let renderer
let scene
let loop
let controls
let resizer
let gui

class World {
  constructor(container, params) {
    birdCamera = createBirdCamera()
    firstPersonCamera = createFirstPersonCamera()
    activeCamera = birdCamera

    scene = createScene()
    renderer = createRenderer()
    loop = new Loop(activeCamera, scene, renderer)
    container.append(renderer.domElement)
    controls = createControls(activeCamera, renderer.domElement)

    const { ambientLight, sunLight } = createLights(params)
    sunLight.shadow.camera.top = params.radius
    sunLight.shadow.camera.bottom = -params.radius
    sunLight.shadow.camera.left = -params.radius
    sunLight.shadow.camera.right = params.radius
    sunLight.shadow.bias = params.shadowBias

    const sunSphere = createSunSphere()

    const base = createBase(params)
    const sunPath = new SunPath(params, sunSphere, sunLight, base)

    const sky = new DynamicSky(params, sunPath.sphereLight, renderer)

    const sunHelper = createDirectionalLightHelper(sunLight, params.sunHelper)
    const sunShadowHelper = createShadowCameraHelper(sunLight)
    // const axesHelper = createAxesHelper(30)
    sunShadowHelper.visible = false

    loop.updatables.push(controls, sunPath, sky)

    scene.add(sky.sky, ambientLight, sunHelper, sunShadowHelper, sunPath.sunPathLight)
    if (params.showControls) {
      gui = createGUI(params, ambientLight, sunLight, sunHelper, sunShadowHelper, sunPath, controls, cameraControl, base)
    }
    resizer = new Resizer(container, activeCamera, renderer)
  }

  async init(model_url) {
    const { house } = await loadHouse(model_url)
    scene.add(house)
    const player = createPlayer(firstPersonCamera, house)
    loop.updatables.push(player)
  }
  resize() {
    resizer.refresh()
  }
  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}

export { World }
