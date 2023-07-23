// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')


import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faTreeCity, faGear, faLink, faQrcode } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'

library.add(faEye, faQrcode, faLink, faGear, faTreeCity, faGoogle, faGithub)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount("#app");