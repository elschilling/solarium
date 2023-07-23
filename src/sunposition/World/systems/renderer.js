import { PCFSoftShadowMap, ReinhardToneMapping, WebGLRenderer } from 'three'

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true, preserveDrawingBuffer: true })
  // renderer.physicallyCorrectLights = true
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = PCFSoftShadowMap
  renderer.toneMapping = ReinhardToneMapping
  return renderer
}

export { createRenderer }