import { AmbientLight, DirectionalLight } from 'three'

function createLights(params) {
  const ambientLight = new AmbientLight('white', params.ambientIntensity)
  const sunLight = new DirectionalLight('white', params.sunIntensity)
  sunLight.castShadow = true
  sunLight.shadow.bias = params.shadowBias
  let mapSize = 1
  sunLight.shadow.mapSize.set(1024 * mapSize, 1024 * mapSize)

  // move the light right, up, and towards us
  // sunLight.position.set(30, 30, 30);

  return { ambientLight, sunLight }
}

export { createLights }
