<template>
  <AppHeader class="header" />
  <div v-if="solarium" class="board">
    <div class="container">
      <form @submit.prevent="handleUpdate">
        <h1>Edit Solarium</h1>
        <div class="fields-row">
          <div class="inputBox">
            <input v-model="form.name" tabindex="0" type="text" label="Name" placeholder=" " required />
            <span>Name</span>
          </div>
          <div class="inputBox">
            <input v-model="form.path" tabindex="0" type="text" label="Password" placeholder=" " required />
            <span>Path</span>
          </div>
        </div>
        <p>The URL will be: {{ localPath }}/{{ form.path }}</p>
        <div v-show="model">
          <Settings v-if="modelVisible" />
          <button v-if="modelVisible" @click.prevent="handleNewModel" class="btn-primary">Upload new model</button>
          <UploadModel v-if="!modelVisible" :database="database" :user="user.id" @uploaded="handleUploaded" />
          <!-- <LoadModel v-show="modelVisible" mode="edit" :model="model" :params="viewParams" /> -->
        </div>
        <p v-show="form.model">Adjust the settings and click save to update Solarium</p>
        <button class="btn-primary" :disabled="!form.name || !form.path || !form.model_url">Save</button>
        <button @click.prevent="handleDelete" class="btn-primary red">Delete</button>
      </form>
    </div>
  </div>
  <div v-else class="board">
    <div class="container">Solarium not found.</div>
  </div>
  <div class="board wrapper" v-show="modelVisible">
    <div class="four-by-three aspect-ratio"></div>
    <LoadModel v-show="modelVisible" mode="edit" :model="model" :params="viewParams" />
  </div>
  <div class="space"></div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import UploadModel from '../components/UploadModel.vue'
import Settings from '../components/Settings.vue'
import LoadModel from '../components/LoadModel.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import useSupabase from '@/composables/UseSupabase'
import useAuthUser from '@/composables/UseAuthUser'
import getFields from '@/composables/GetFields'
import getThumb from '@/composables/GetThumb'
import storageUpload from '@/composables/StorageUpload'

const props = defineProps({
  path: String,
})
const { user } = useAuthUser()
const router = useRouter()
const { supabase, storage_path } = useSupabase()
const database = ref(supabase)
const model = ref()
const solarium = ref({})
const viewParams = ref()
const form = ref({})
const modelVisible = ref(true)
const localPath = ref(window.location.origin)
let file = {}
let url

const getSolarium = async () => {
  const { data } = await supabase.from('solarium').select().eq('path', props.path)
  solarium.value = data[0]
  if (user.value.id != solarium.value.user_id) {
    router.push('/')
  }
  form.value = Object.create(solarium.value)
  viewParams.value = Object.create(solarium.value)
  viewParams.value.editMode = true
  viewParams.value.showControls = true
  viewParams.value.animateTime = true
  viewParams.value.showSunSurface = true
  viewParams.value.showAnalemmas = true
  viewParams.value.showSunDayPath = true
  viewParams.value.minute = new Date().getMinutes()
  viewParams.value.hour = new Date().getHours()
  viewParams.value.day = new Date().getDate()
  viewParams.value.month = new Date().getMonth() + 1
  viewParams.value.timeSpeed = 100
  viewParams.value.rayleigh = 0.425
  viewParams.value.mieCoefficient = 0.012
  viewParams.value.mieDirectionalG = 1
  url = storage_path + solarium.value.model_url
  const type = solarium.value.model_url.split('.').pop()
  model.value = { url, type }
}

const handleUpdate = async () => {
  if (file.name) {
    // If new file, remove old model
    await deleteFiles([solarium.value.model_url, solarium.value.thumb_url])
    // Upload new model
    form.value.model_url = await storageUpload(supabase, user.value.id, file)
  } else {
    file.name = solarium.value.model_url.split('/')[1]
  }
  // Remove old thumbnail
  await deleteFiles([solarium.value.thumb_url])
  // Generate new thumbnail
  form.value.thumb_url = await getThumb(file.name, supabase, user.value.id)
  form.value.last_edit = new Date(Date.now())
  form.value = { ...form.value, ...getFields() }
  try {
    const { error } = await supabase.from('solarium').update(form.value).eq('id', solarium.value.id)
    if (error) {
      throw error
    }
    router.push('/me')
  } catch (e) {
    console.error(e)
  }
}

const handleDelete = async () => {
  const { status } = await supabase.from('solarium').delete().eq('path', props.path)
  if (status == 204) {
    alert('Delete successfully')
    router.push('/me')
  } else {
    alert('Something wrong')
  }
  await deleteFiles([solarium.value.model_url, solarium.value.thumb_url])
}

const deleteFiles = async (files) => {
  const { error } = await supabase.storage.from('solarium').remove(files)
  if (error) {
    console.log('error', error)
  }
}

const handleNewModel = async () => {
  modelVisible.value = false
}

const handleUploaded = (modelObj, filedata) => {
  model.value = modelObj
  form.value.model_url = filedata.name
  modelVisible.value = true
  file = filedata
}

onMounted(() => {
  getSolarium()
})
</script>

<style scoped>
.flexBox {
  display: flex;
  flex-flow: column;
  height: 100%;
}
.header {
  flex: 0 1 auto;
}
.canvasContainer {
  flex: 1 1 auto;
  position: relative;
  height: 100%;
}
.settingsContainer {
  flex: 0 1 50px;
}
.red {
  background: brown;
}
</style>
