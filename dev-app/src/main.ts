import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DataGridVue } from 'data-grid-vue'
import 'data-grid-vue/style'

createApp(App).use(router).use(DataGridVue).mount('#app')
