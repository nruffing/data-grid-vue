import { defineClientConfig } from '@vuepress/client'
import { DataGridVue } from 'data-grid-vue'
import DEMO from '../demo-data/DEMO_DATA'
import constants from './constants'
import Layout from './layouts/Layout.vue'
import { useThemeLocaleData } from '../../node_modules/@vuepress/theme-default/lib/client'
import { RouteLocationNormalized, useRouter } from 'vue-router'

let sideBarCache: 'auto' | false | SidebarConfig = false

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(DataGridVue)
    app.provide('demo', DEMO)
    app.config.globalProperties.$dgv = constants
  },
  setup() {
    const themeLocale = useThemeLocaleData()
    const router = useRouter()

    router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      if (to.fullPath?.startsWith('/generated/') && !from.fullPath?.startsWith('/generated/')) {
        sideBarCache = themeLocale.value.sidebar
        themeLocale.value.sidebar = 'auto'
      } else if (!to.fullPath?.startsWith('/generated/') && from.fullPath?.startsWith('/generated/')) {
        themeLocale.value.sidebar = sideBarCache
        sideBarCache = false
      }
    })
  },
  layouts: {
    Layout,
  },
})
