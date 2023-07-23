<template>
  <AppHeaderVue />
  <div v-for="solarium in formattedSolariums" :key="solarium.id" class="board">
    <div class="container">
      <div class="subcontainer">
        <div class="thumb-container">
          <router-link :to="{ name: 'Solarium', params: { path: solarium.path } }">
            <img :src="solarium.thumb_url" />
          </router-link>
        </div>
        <div class="info">
          <div class="solarium-row">
            <h2>{{ solarium.name }}</h2>
          </div>
          <div class="solarium-row">
            <router-link :to="{ name: 'Solarium', params: { path: solarium.path } }">
              <font-awesome-icon :icon="['fas', 'link']" />
            </router-link>
            <router-link :to="{ name: 'Solarium', params: { path: solarium.path } }" class="solarium-url">
              <p>{{ solarium.solariumPath }}</p>
            </router-link>
            <font-awesome-icon :icon="['fas', 'qrcode']" size="xl" />
          </div>
          <div class="solarium-row">
            <div></div>
            <div class="views-col">
              <p class="solarium-views">{{ solarium.views.view }}</p>
              <font-awesome-icon :icon="['fas', 'eye']" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Created by {{ solarium.email }} on {{ solarium.createdData }}</p>
      <p>{{ solarium.lastEdit }}</p>
    </div>
  </div>
</template>

<script setup>
import AppHeaderVue from '@/components/AppHeader.vue'
import { ref, onMounted, computed } from 'vue'
import useSupabase from '@/composables/UseSupabase'
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
      let lastEdit = 'Last edited ' + formatDistanceToNow(new Date(doc.last_edit))
      let solariumPath = window.location.origin + '/' + doc.path
      doc.thumb_url = storage_path + doc.thumb_url
      return { ...doc, createdData, lastEdit, solariumPath }
    })
  }
})
</script>

<style></style>
