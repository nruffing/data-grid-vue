import { defineClientConfig } from 'vuepress/client'
import { DataGridVue } from 'data-grid-vue'
import LandingFeature from './components/LandingFeature.vue'
import DEMO from '../demo-data/DEMO_DATA'
import constants from './constants'
import Layout from './layouts/Layout.vue'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

const appInsights = new ApplicationInsights({
  config: {
    connectionString:
      'InstrumentationKey=99a45096-c9c1-471c-ae4a-03ada9fe086f;IngestionEndpoint=https://eastus2-3.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus2.livediagnostics.monitor.azure.com/',
  },
})

appInsights.addTelemetryInitializer(envelope => {
  if (!envelope.data) {
    envelope.data = {}
  }
  envelope.data['userAgent'] = navigator.userAgent
  envelope.data['language'] = navigator.language
  envelope.data['referrer'] = document.referrer
  envelope.data['screenHeight'] = window?.screen?.height
  envelope.data['screenWidth'] = window?.screen?.width
  envelope.data['windowInnerHeight'] = window?.innerHeight
  envelope.data['windowInnerWidth'] = window?.innerWidth
})

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('LandingFeature', LandingFeature)

    app.use(DataGridVue)
    app.provide('demo', DEMO)
    app.config.globalProperties.$dgv = constants

    if (process.env.NODE_ENV === 'production') {
      router.beforeEach((to, from) => {
        appInsights.startTrackPage(to.fullPath)
      })
      router.afterEach(to => {
        appInsights.stopTrackPage(to.fullPath)
        appInsights.flush()
      })
      appInsights.loadAppInsights()
    }

    router.options.scrollBehavior = (to, from, savedPosition) => {
      if (to.hash) {
        return {
          el: to.hash,
          top: 200,
          behavior: 'smooth',
        }
      }
      return savedPosition || { top: 0 }
    }
  },
  layouts: {
    Layout,
  },
})
