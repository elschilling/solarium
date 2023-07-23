<template>
  <h2>Parameters</h2>
  <p>Adjust the parameters via <b>Settings</b> menu and click save to create Solarium</p>
  <div class="fields-row">
    <h3>Base</h3>
    <div class="inputBox">
      <span>Radius</span>
      <input type="text" id="radius" disabled />
    </div>
    <div class="inputBox">
      <span>Base height</span>
      <input type="text" id="baseY" disabled />
    </div>
    <h3>Location</h3>
    <div class="inputBox">
      <span>Latitude</span>
      <input type="text" id="latitude" disabled />
    </div>
    <div class="inputBox">
      <span>Longitude</span>
      <input type="text" id="longitude" disabled />
    </div>
    <div class="inputBox">
      <span>North Offset</span>
      <input type="text" id="northOffset" disabled />
    </div>
    <h3>Sky</h3>
    <div class="inputBox">
      <span>Turbidity</span>
      <input type="text" id="turbidity" disabled />
    </div>
    <div class="inputBox">
      <span>Exposure</span>
      <input type="text" id="exposure" disabled />
    </div>
    <h3>Light</h3>
    <div class="inputBox">
      <span>Sun intensity</span>
      <input type="text" id="sunIntensity" disabled />
    </div>
    <div class="inputBox">
      <span>Ambient intensity</span>
      <input type="text" id="ambientIntensity" disabled />
    </div>
    <div class="inputBox">
      <span>Shadow bias</span>
      <input type="text" id="shadowBias" disabled />
    </div>
    <div class="inputBox">
      <span>Show Sun helper</span>
      <input type="checkbox" id="sunHelper" disabled class="checkbox" />
    </div>
  </div>
</template>

<style scoped>
h3 {
  text-align: left;
  color: #333;
  font-size: 1em;
  margin: 0;
}
p {
  font-size: 1rem;
  padding: 0;
}
.inputBox span {
  background: #e8e9ec;
  color: black;
  translate: 3px -7px;
  font-size: 0.65em;
  padding: 2px 8px;
}
.checkbox {
  all: unser;
  background: black;
  width: 20px;
  margin-top: 15px;
  width: auto;
  float: left;
}
</style>
