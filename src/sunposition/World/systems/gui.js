import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

function createGUI(params, ambientLight, sunLight, sunHelper, shadowCameraHelper, sunPath, controls, cameraControl, base) {
  const gui_container = document.querySelector('#gui-container')
  const gui = new GUI({ autoPlace: false })
  gui.domElement.id = 'gui_container'
  gui_container.appendChild(gui.domElement)
  gui.close()

  if (params.editMode) {
    gui.title('Settings')
    // Base
    const fieldRadius = document.getElementById('radius')
    const fieldBaseY = document.getElementById('baseY')
    // Location
    const fieldLatitude = document.getElementById('latitude')
    const fieldLongitude = document.getElementById('longitude')
    const fieldNorthOffset = document.getElementById('northOffset')
    // Sky
    const fieldTurbidity = document.getElementById('turbidity')
    const fieldExposure = document.getElementById('exposure')
    // Light
    const fieldSunIntensity = document.getElementById('sunIntensity')
    const fieldAmbientIntensity = document.getElementById('ambientIntensity')
    const fieldShadowBias = document.getElementById('shadowBias')
    const fieldSunHelper = document.getElementById('sunHelper')

    function updateParameters() {
      fieldRadius.value = params.radius
      fieldBaseY.value = base.position.y
      fieldLatitude.value = params.latitude
      fieldLongitude.value = params.longitude
      fieldNorthOffset.value = params.northOffset
      fieldTurbidity.value = params.turbidity
      fieldExposure.value = params.exposure
      fieldSunIntensity.value = sunLight.intensity
      fieldAmbientIntensity.value = ambientLight.intensity
      fieldShadowBias.value = sunLight.shadow.bias
      fieldSunHelper.checked = sunHelper.visible
    }
    updateParameters()

    const baseFolder = gui.addFolder('Base')
    baseFolder
      .add(params, 'radius', 10, 100, 0.1)
      .name('Radius')
      .onChange(() => {
        sunPath.updateLocation()
        base.update()
        updateParameters()
      })
    baseFolder
      .add(base.position, 'y', -100, 100, 0.1)
      .name('Base height')
      .onChange(() => {
        updateParameters()
      })
    baseFolder.close()
    const locationFolder = gui.addFolder('Location')
    locationFolder.add(params, 'latitude').onChange(() => {
      sunPath.updateLocation()
      updateParameters()
    })
    locationFolder.add(params, 'longitude').onChange(() => {
      sunPath.updateLocation()
      updateParameters()
    })
    locationFolder.add(params, 'northOffset').onChange(() => {
      sunPath.updateNorth()
      updateParameters()
    })
    locationFolder.close()

    const skyFolder = gui.addFolder('Sky')
    skyFolder.add(params, 'turbidity', 0.0, 20.0, 0.1).onChange(() => {
      updateParameters()
    })
    // skyFolder.add(skyControl, 'rayleigh', 0.0, 4, 0.001)
    // skyFolder.add(skyControl, 'mieCoefficient', 0.0, 0.1, 0.001)
    // skyFolder.add(skyControl, 'mieDirectionalG', 0.0, 1, 0.001)
    skyFolder.add(params, 'exposure', 0, 10, 0.001).onChange(() => {
      updateParameters()
    })
    skyFolder.close()

    const lightFolder = gui.addFolder('Light')
    lightFolder
      .add(sunLight, 'intensity')
      .min(0)
      .max(10)
      .name('Sun Intensity')
      .onChange(() => {
        updateParameters()
      })
    lightFolder
      .add(ambientLight, 'intensity')
      .min(0)
      .max(10)
      .name('Ambient Intensity')
      .onChange(() => {
        updateParameters()
      })
    lightFolder
      .add(sunLight.shadow, 'bias', -0.01, 0, 0.00001)
      .name('Shadow bias')
      .onChange(() => {
        updateParameters()
      })
    lightFolder
      .add(sunHelper, 'visible')
      .name('Sun Helper')
      .onChange(() => {
        updateParameters()
      })
    // lightFolder.add(sunLight, 'castShadow').name('Sun shadows')
    // lightFolder.add(shadowCameraHelper, 'visible').name('Shadow Helper')
    lightFolder.close()
  }

  const cameraFolder = gui.addFolder('Camera')
  cameraFolder.add(controls, 'autoRotate')
  // TO DO: Implement first person camera settings
  // cameraFolder.add(cameraControl, 'firstPerson')
  // cameraFolder.add(cameraControl, 'birdView')
  cameraFolder.close()

  const sunsurfaceFolder = gui.addFolder('Sun Surface')
  sunsurfaceFolder.add(params, 'showSunSurface').onChange(() => sunPath.updateLocation())
  sunsurfaceFolder.add(params, 'showAnalemmas').onChange(() => sunPath.updateLocation())
  sunsurfaceFolder.add(params, 'showSunDayPath').onChange(() => sunPath.updateLocation())
  sunsurfaceFolder.add(sunPath.sunPathLight.children[0].children[0], 'visible').name('Sun Sphere')
  sunsurfaceFolder.add(sunPath.sunPathLight.children[1], 'visible').name('Orientation')
  sunsurfaceFolder.close()

  const timeFolder = gui.addFolder('Time')
  timeFolder
    .add(params, 'minute', 0, 60, 1)
    .onChange(() => sunPath.updateHour())
    .listen()
  timeFolder
    .add(params, 'hour', 0, 24, 1)
    .onChange(() => sunPath.updateHour())
    .listen()
  timeFolder
    .add(params, 'day', 1, 30, 1)
    .onChange(() => sunPath.updateMonth())
    .listen()
  timeFolder
    .add(params, 'month', 1, 12, 1)
    .onChange(() => sunPath.updateMonth())
    .listen()
  timeFolder.add(params, 'animateTime')
  timeFolder.add(params, 'timeSpeed').min(0).max(10000).step(0.1)
  timeFolder.close()

  // skyFolder.hide()
  // lightFolder.hide()
  // locationFolder.hide()

  return gui
}

export { createGUI }
