import { Mesh, MeshBasicMaterial, SphereGeometry } from "three"

function createSunSphere() {
  const sunSphere = new Mesh(
    new SphereGeometry(),
    new MeshBasicMaterial({ color: 'yellow' })
  )
  // sunSphere.position.y = 30
  return sunSphere
}

export { createSunSphere }