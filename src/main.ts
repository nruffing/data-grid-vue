import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '../lib/styles/DataGridVueDark.css'

createApp(App)
  .use(router)
  .mount('#app')
