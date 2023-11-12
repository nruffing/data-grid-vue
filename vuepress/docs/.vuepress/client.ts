import { defineClientConfig } from '@vuepress/client'
import { DataGridVue } from 'data-grid-vue'
import DEMO from '../demo-data/DEMO_DATA'
import constants from './constants'
import Layout from './layouts/Layout.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(DataGridVue)
    app.provide('demo', DEMO)
    app.config.globalProperties.$dgv = constants
  },
  layouts: {
    Layout,
  },
})
