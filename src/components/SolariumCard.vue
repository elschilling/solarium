<template>
  <div v-if="solarium" class="board">
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
            <router-link v-if="solarium.editable" :to="{ name: 'Edit', params: { path: solarium.path } }">
              <font-awesome-icon :icon="['fas', 'gear']" size="xl" alt="Edit settings" />
            </router-link>
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
const props = defineProps({
  solarium: {
    type: Object,
  },
})
</script>
