---
pageClass: data-grid-vue-landing
---

<div class="landing">
  <div class="landingBackground">
    <LandingBackground />
  </div>
  <div
    class="landing-container"
    :style="{ height: `calc(${landingHeight}px - calc(2 * var(--landing-container-margin)))` }"
  >
    <div class="left">
      <span class="title">
        <img class="logo" src="favicon.png" />
        <h1>Data Grid Vue</h1>
      </span>
      <span class="sub-title">
        <h2>Natively designed for Vue3</h2>
        <h2>Design for full customization</h2>
        <h2>Flat html and CSS grid for full layout control</h2>
        <h2>All features included in MIT license</h2>
      </span>
      <div class="badges">
        <button @click="onGetStarted">Get Started</button>
        <a href="https://www.npmjs.com/package/data-grid-vue" target="_blank" aria-label="npm">
          <img alt="npm" src="https://img.shields.io/npm/v/data-grid-vue?logo=npm" />
        </a>
        <a href="https://github.com/nruffing/data-grid-vue/blob/main/LICENSE" target="_blank" aria-label="MIT License">
          <img alt="GitHub" src="https://img.shields.io/github/license/nruffing/data-grid-vue" />
        </a>
      </div>
    </div>
    <div class="right">
      <dgv-data-grid
        v-if="columns.length"
        v-model:columns="columns"
        :data="data"
        :sort-options="{
          sortable: true,
          multiColumn: false,
        }"
        :allow-column-reorder="true"
        :show-column-selection="true"
      >
      </dgv-data-grid>
    </div>
  </div>
</div>

<script lang="ts" setup>
import { ref, inject, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const landingHeight = ref<number>(0)
const columns = ref<Column[]>([])
const data = ref<any[]>([])

onMounted(() => {
  const DEMO = inject('demo')
  columns.value = [...DEMO.columns]
  data.value = DEMO.data
  onWindowResize()
  window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})

function onWindowResize() {
  const backgroundContainer = document.querySelector('.landingBackground')
  landingHeight.value = backgroundContainer?.clientHeight ?? 0
}

const router = useRouter()
function onGetStarted() {
  router.push({ path: '/guide' })
}
</script>

!!!include(features.md)!!!
