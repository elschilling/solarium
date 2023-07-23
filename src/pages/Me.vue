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
            <router-link :to="{ name: 'Edit', params: { path: solarium.path } }">
              <font-awesome-icon :icon="['fas', 'gear']" size="xl" alt="Edit settings" />
            </router-link>
          </div>
          <div class="solarium-row">
            <font-awesome-icon :icon="['fas', 'link']" />
            <router-link :to="{ name: 'Solarium', params: { path: solarium.path } }" class="solarium-url">
              <p>{{ solarium.solariumPath }}</p>
            </router-link>
            <font-awesome-icon :icon="['fas', 'qrcode']" size="xl" />
          </div>
          <div class="solarium-row views-row">
            <p class="solarium-views">{{ solarium.views.view }}</p>
            <font-awesome-icon :icon="['fas', 'eye']" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p>Created by {{ solarium.email }} at {{ solarium.createdData }}</p>
      <p>{{ solarium.lastEdit }}</p>
    </div>
  </div>

  <!-- <h1>Home</h1>
  <div v-for="(solarium) in solariums" :key="solarium.id">
    <h2><router-link :to="{ name: 'Solarium', params: { path: solarium.path } }">{{ solarium.name }}</router-link></h2>
    <p>Model URL: {{ solarium.model_url }}</p>
    <p>Latitude: {{ solarium.latitude }}</p>

  </div> -->
</template>

<script setup>
import AppHeaderVue from '@/components/AppHeader.vue'
import { format, formatDistanceToNow } from 'date-fns'
import { ref, onMounted, computed } from 'vue'
import useAuthUser from '@/composables/UseAuthUser'
import useSupabase from '@/composables/UseSupabase'

const { user } = useAuthUser()
const { supabase, storage_path } = useSupabase()
const solariums = ref()

const getSolariums = async () => {
  const { data } = await supabase.from('solarium').select('*, views ( view)').eq('user_id', user.value.id)
  solariums.value = data
}

onMounted(() => {
  getSolariums()
})

const formattedSolariums = computed(() => {
  if (solariums.value) {
    let data = solariums.value
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
