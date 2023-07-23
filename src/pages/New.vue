<template>
  <AppHeader />
  <div class="board">
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <h1>New Solarium</h1>
        <div class="fields-row">
          <div class="inputBox">
            <input v-model="form.name" tabindex="0" type="text" label="Name" placeholder=" " required />
            <span>Name</span>
          </div>
          <div class="inputBox">
            <input v-model="form.path" tabindex="0" type="text" label="Password" placeholder=" " required />
            <span>Path</span>
          </div>
          <p>The URL will be: http://solarium.vercel.app/{{ form.path }}</p>
          <div class="inputBox" v-if="modelVisible">
            <input v-model="form.model_url" type="text" disabled placeholder=" " />
            <span>3D model</span>
          </div>
        </div>
        <UploadModel v-show="!modelVisible" :database="supabase" :user="user.id" @uploaded="handleUploaded" />
        <!-- <Settings :params="form" v-if="modelVisible" /> -->
        <Settings v-if="modelVisible" />
        <button v-if="modelVisible" @click.prevent="modelVisible = false" class="btn-primary">Upload new model</button>
        <LoadModel v-show="modelVisible" mode="edit" :model="model" :params="defaultParams" />
        <button class="btn-primary" :disabled="!form.name || !form.path || !form.model_url">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import Settings from '@/components/Settings.vue'
import UploadModel from '@/components/UploadModel.vue'
import LoadModel from '@/components/LoadModel.vue'
import useSupabase from '@/composables/UseSupabase'
import useAuthUser from '@/composables/UseAuthUser'
import getFields from '@/composables/GetFields'
import getThumb from '@/composables/GetThumb'
import storageUpload from '@/composables/StorageUpload'

const router = useRouter()
const { supabase } = useSupabase()
const { user } = useAuthUser()
const form = ref({})
const model = ref({})
const modelVisible = ref(false)
const defaultParams = ref({
  editMode: true,
  showControls: true,
  animateTime: true,
  showSunSurface: true,
  showAnalemmas: true,
  showSunDayPath: true,
  minute: new Date().getMinutes(),
  hour: new Date().getHours(),
  day: new Date().getDate(),
  month: new Date().getMonth() + 1,

  latitude: 0,
  longitude: 0,
  northOffset: 0,
  radius: 20,
  baseY: 0,

  timeSpeed: 100,

  turbidity: 10,
  exposure: 7,
  rayleigh: 0.425,
  mieCoefficient: 0.012,
  mieDirectionalG: 1,

  sunIntensity: 8,
  ambientIntensity: 1.7,
  shadowBias: -0.0001,
  sunHelper: true,
})
let file

const handleSubmit = async () => {
  form.value.model_url = await storageUpload(supabase, user.value.id, file)
  form.value.thumb_url = await getThumb(file.name, supabase, user.value.id)
  form.value.last_edit = new Date(Date.now())
  form.value = { ...form.value, ...getFields() }
  try {
    const { data, error } = await supabase.from('solarium').insert(form.value).select()
    if (error) {
      throw error
    }
    try {
      const { error } = await supabase.from('views').insert({ solarium_id: data[0].id })
      if (error) {
        throw error
      }
      router.push('/me')
    } catch (e) {
      console.error('Error occurred while inserting data:', e)
    }
  } catch (e) {
    console.error('Error occurred while inserting data:', e)
    if (e.code === '23505') {
      alert('Path already in use.')
    }
  }
}

const handleUploaded = (modelObj, filedata) => {
  model.value = modelObj
  form.value.model_url = filedata.name
  modelVisible.value = true
  file = filedata
}
</script>
<style scoped>
.fields-row p {
  margin-top: 0px;
}
</style>
