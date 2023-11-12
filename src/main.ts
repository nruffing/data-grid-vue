import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DataGridVue, DataGridVueOptions } from '../lib/main'

const dataGridVueOptions = {
  dataGridComponentName: 'custom-data-grid',
} as DataGridVueOptions

createApp(App).use(router).use(DataGridVue, dataGridVueOptions).mount('#app')
