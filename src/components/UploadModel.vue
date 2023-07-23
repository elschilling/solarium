<template>
  <div
    @dragenter.prevent="toggleActive"
    @dragleave="toggleActive"
    @dragover.prevent
    @drop.prevent="drop"
    :class="{ highlight: active }"
    id="drop-area"
    @change="handleChange"
  >
    <span>Drop your .glb or .ifc 3D model</span>
    <span>or</span>
    <label for="dropzoneFile">Select file</label>
    <input type="file" id="dropzoneFile" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  user: String,
  database: {
    type: Object,
  },
})
const emit = defineEmits(['uploaded'])

const extensions = ['glb', 'ifc']

const checkExtension = (filename) => {
  const extension = filename.split('.').pop()
  const isAllowed = extensions.includes(extension)
  if (!isAllowed) {
    alert('Invalid 3D model')
  }
  return isAllowed
}

const drop = (e) => {
  toggleActive()
  const file = e.dataTransfer.files[0]
  if (checkExtension(file.name)) {
    handleModelUpload(file)
  }
}
const active = ref(false)
const toggleActive = () => {
  active.value = !active.value
}

const handleChange = (e) => {
  const file = e.target.files[0]
  if (checkExtension(file.name)) {
    handleModelUpload(file)
  }
}

const handleModelUpload = async (file) => {
  const type = file.name.split('.').pop()
  const url = URL.createObjectURL(file)
  emit('uploaded', { url, type }, file)
}
</script>

<style scoped>
#drop-area {
  margin: 20px 0px;
  border: 4px dashed #555;
  transition: 0.3s ease all;
  background: #aaa;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  color: white;
}
#drop-area label {
  padding: 10px;
  background: black;
}
#drop-area input {
  display: none;
}
#drop-area.highlight {
  background: #333;
  color: white;
}
</style>
