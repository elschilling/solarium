<template>
  <AppHeader />
  <SolariumCard v-for="solarium in formattedSolariums" :solarium="solarium" :key="solarium.id" />
  <AppFooter />
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import SolariumCard from '@/components/SolariumCard.vue'
import AppFooter from '@/components/AppFooter.vue'
import useSupabase from '@/composables/UseSupabase'
import { ref, onMounted, computed } from 'vue'
import { format, formatDistanceToNow } from 'date-fns'

const { supabase, storage_path } = useSupabase()
const solariums = ref()

const getSolariums = async () => {
  const { data } = await supabase.from('solarium').select('*, views ( view)')
  solariums.value = data
}

onMounted(async () => {
  await getSolariums()
})

const formattedSolariums = computed(() => {
  if (solariums.value) {
    let data = solariums.value.sort((a, b) => Number(new Date(b.last_edit)) - Number(new Date(a.last_edit)))
    return data.map((doc) => {
      let createdData = format(new Date(doc.created_at), 'MM/dd/yyyy')
      let lastEdit = 'Last edited ' + formatDistanceToNow(new Date(doc.last_edit)) + ' ago'
      let solariumPath = window.location.origin + '/' + doc.path
      doc.thumb_url = storage_path + doc.thumb_url
      return { ...doc, createdData, lastEdit, solariumPath }
    })
  }
})
</script>

<style></style>
