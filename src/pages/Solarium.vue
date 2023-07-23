<template>
  <div v-if="solarium">
    <LoadModel mode="view" :model="model" :params="viewParams" />
  </div>
  <div v-else class="board">
    <div class="container">Solarium not found.</div>
  </div>
</template>

<script setup>
import LoadModel from '@/components/LoadModel.vue'
import useSupabase from '@/composables/UseSupabase'
import { ref, onMounted } from 'vue'
const props = defineProps({
  path: String,
})
const { supabase, storage_path } = useSupabase()
const model = ref()
const solarium = ref({})
const viewParams = ref()
const getSolarium = async () => {
  try {
    const { data, error } = await supabase.from('solarium').select().eq('path', props.path)
    if (error) {
      throw error
    }
    solarium.value = data[0]
    try {
      const { error } = await supabase.rpc('increment', { row_id: solarium.value.id })
      if (error) {
        throw error
      }
    } catch (e) {
      alert(e.message)
      console.error(e)
    }
  } catch (e) {
    alert(e.message)
    console.error(e)
  }
  viewParams.value = solarium.value
  viewParams.value.editMode = false
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
  const url = storage_path + solarium.value.model_url
  const type = solarium.value.model_url.split('.').pop()
  model.value = { url, type }
}
onMounted(() => {
  getSolarium()
})
</script>
