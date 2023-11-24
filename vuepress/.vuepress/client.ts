import { defineClientConfig } from '@vuepress/client'
//import { SidebarConfig } from '@vuepress/theme-default'
import { DataGridVue } from 'data-grid-vue'
import DEMO from '../demo-data/DEMO_DATA'
import constants from './constants'
import Layout from './layouts/Layout.vue'
import { useThemeLocaleData } from '../node_modules/@vuepress/theme-default/lib/client'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ClickAnalyticsPlugin } from '@microsoft/applicationinsights-clickanalytics-js'

let sideBarCache: any = false

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

    function isAutoSidebar(route: RouteLocationNormalized): boolean {
      return route.fullPath?.startsWith('/generated/') || route.fullPath?.startsWith('/dotnet-generated/')
    }

    function flipToAutoSidebar() {
      sideBarCache = themeLocale.value.sidebar
      themeLocale.value.sidebar = 'auto'
    }

    if (isAutoSidebar(router.currentRoute.value)) {
      flipToAutoSidebar()
    }

    router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
      const toIsAuto = isAutoSidebar(to)
      const fromIsAuto = isAutoSidebar(from)
      if (toIsAuto && !fromIsAuto) {
        flipToAutoSidebar()
      } else if (!toIsAuto && fromIsAuto) {
        themeLocale.value.sidebar = sideBarCache
        sideBarCache = false
      }
    })
  },
  layouts: {
    Layout,
  },
})
