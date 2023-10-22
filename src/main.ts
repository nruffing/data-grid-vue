import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DataGridVue, type DataGridVueOptions } from '../lib/main'

import '../lib/styles/DataGridVueDark.css'

createApp(App)
  .use(router)
  .use(DataGridVue, {} as DataGridVueOptions)
  .mount('#app')
