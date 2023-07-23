import { AxesHelper, CameraHelper, DirectionalLightHelper } from 'three'

function createDirectionalLightHelper(light, isVisible) {
  const directionalLightHelper = new DirectionalLightHelper(light)
  directionalLightHelper.visible = isVisible
  return directionalLightHelper
}

function createShadowCameraHelper(light) {
  const shadowCameraHelper = new CameraHelper(light.shadow.camera)
  return shadowCameraHelper
}

function createAxesHelper(size) {
  const axesHelper = new AxesHelper(size)
  return axesHelper
}

export { createDirectionalLightHelper, createShadowCameraHelper, createAxesHelper }
