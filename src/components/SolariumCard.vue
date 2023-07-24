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
            <div class="link iconLink"><font-awesome-icon :icon="['fas', 'qrcode']" size="2xl" @click="showQRcode" /></div>
          </div>
          <div class="solarium-row">
            <div></div>
            <div class="views-col">
              <p class="solarium-views">{{ solarium.views.view }}</p>
              <font-awesome-icon :icon="['fas', 'eye']" size="xl" />
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
  <Transition>
    <QRcode v-if="showQR" :url="url" @click="hideQRcode" class="link" />
  </Transition>
</template>

<script setup>
const props = defineProps({
  solarium: {
    type: Object,
  },
})
import QRcode from '@/components/QRcode.vue'
import { ref } from 'vue'

const url = window.location.origin + '/' + props.solarium.path
const showQR = ref(false)
const showQRcode = () => {
  showQR.value = true
}
const hideQRcode = () => {
  showQR.value = false
}
</script>

<style scoped>
.iconLink svg {
  margin-right: -10px;
  padding: 20px;
}
.link {
  cursor: pointer;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
  transform: scale(1);
}

.v-enter-from,
.v-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
