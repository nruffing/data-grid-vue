import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DataGridVue, type DataGridVueOptions } from '../lib/main'

createApp(App).use(router).use(DataGridVue).mount('#app')
