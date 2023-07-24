<template>
  <div class="QRcontainer">
    <qrcode-vue :value="url" :size="300" class="QRcode" />
    <div>
      <p>{{ url }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  url: String,
})
import QrcodeVue from 'qrcode.vue'
</script>

<style scoped>
.QRcontainer {
  background: white;
  border-radius: 20px;
  position: fixed;
  padding: 20px;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  box-shadow: 0px 0px 80px 400px rgba(0, 0, 0, 0.9);
  z-index: 100;
}
</style>
