import { defineClientConfig } from '@vuepress/client'
import { SidebarConfig } from '@vuepress/theme-default'
import { DataGridVue } from 'data-grid-vue'
import DEMO from '../demo-data/DEMO_DATA'
import constants from './constants'
import Layout from './layouts/Layout.vue'
import { useThemeLocaleData } from '../../node_modules/@vuepress/theme-default/lib/client'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ClickAnalyticsPlugin } from '@microsoft/applicationinsights-clickanalytics-js'
import { generateW3CId } from '@microsoft/applicationinsights-core-js'

let sideBarCache: 'auto' | false | SidebarConfig = false

const clickPluginInstance = new ClickAnalyticsPlugin()
const clickPluginConfig = {
  autoCapture: true,
  useDefaultContentNameOrId: true,
  urlCollectQuery: true,
  urlCollectHash: true,
}
const appInsights = new ApplicationInsights({
  config: {
    connectionString:
      'InstrumentationKey=99a45096-c9c1-471c-ae4a-03ada9fe086f;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/',
    extensions: [clickPluginInstance],
    extensionConfig: {
      [clickPluginInstance.identifier]: clickPluginConfig,
    },
  },
})

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(DataGridVue)
    app.provide('demo', DEMO)
    app.config.globalProperties.$dgv = constants

    if (import.meta.env.MODE === 'production') {
      router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
        appInsights.startTrackPage(to.fullPath)
      })
      router.afterEach((to: RouteLocationNormalized) => {
        appInsights.stopTrackPage(to.fullPath)
        appInsights.flush()
      })
      appInsights.loadAppInsights()
    }
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
