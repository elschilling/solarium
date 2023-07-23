import { Box3, Vector3 } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { IFCLoader } from 'web-ifc-three'
import { setupModel } from './setupModel'

async function loadHouse(model) {
  const progressBar = document.getElementById('progress-bar')
  const progressValue = document.querySelector('.progress-value')
  const progressStatus = document.querySelector('.progress-status')

  const loadingProgress = (progress) => {
    const percentage = Math.round((progress.loaded / progress.total) * 100)
    progressBar.style.background = `conic-gradient(orange ${percentage * 3.6}deg , transparent 0deg)`
    progressValue.textContent = percentage + '%'
  }

  let house
  if (model.type === 'ifc') {
    progressStatus.textContent = 'Loading model'
    const ifcLoader = new IFCLoader()
    ifcLoader.ifcManager.setWasmPath('/wasm/')
    house = await ifcLoader.loadAsync(model.url, (progress) => {
      loadingProgress(progress)
    })
  } else if (model.type === 'glb') {
    progressStatus.textContent = 'Loading model'
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    const houseData = await gltfLoader.loadAsync(model.url, (progress) => {
      loadingProgress(progress)
    })
    house = setupModel(houseData)
  }
  progressStatus.textContent = 'Setting shadows'
  house.traverse((n) => {
    if (n.isMesh) {
      if (n.material.name === 'esquadria.vidro') {
        n.castShadow = false
      } else {
        n.castShadow = true
        n.receiveShadow = true
      }
    }
  })
  const box = new Box3().setFromObject(house)
  const center = box.getCenter(new Vector3())
  house.position.x += house.position.x - center.x
  house.position.z += house.position.z - center.z
  progressStatus.textContent = 'Finished loading'
  progressBar.style.opacity = 0

  return { house }
}

export { loadHouse }
