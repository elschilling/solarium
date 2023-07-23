export default function getFields() {
  return {
    radius: document.getElementById('radius').value,
    baseY: document.getElementById('baseY').value,
    latitude: document.getElementById('latitude').value,
    longitude: document.getElementById('longitude').value,
    northOffset: document.getElementById('northOffset').value,
    turbidity: document.getElementById('turbidity').value,
    exposure: document.getElementById('exposure').value,
    sunIntensity: document.getElementById('sunIntensity').value,
    ambientIntensity: document.getElementById('ambientIntensity').value,
    shadowBias: document.getElementById('shadowBias').value,
    sunHelper: document.getElementById('sunHelper').checked,
  }
}
