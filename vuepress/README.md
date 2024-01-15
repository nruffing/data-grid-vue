---
pageClass: data-grid-vue-landing
---

<div class="landing" :class="{ 'show-nav-logo': showNavLogo }">  
  <div class="left">
    <span class="title">
      <!-- alt text intentionally added as an empty string, see: https://dequeuniversity.com/rules/axe/4.8/image-redundant-alt?application=AxeChrome -->
      <img class="logo" src="/favicon.png" alt="" />
      <h1>Data Grid Vue</h1>
    </span>
    <div class="flex-spacer"></div>
    <span class="sub-title">
      <h2><span class="caret"></span>Natively designed for Vue3</h2>
      <h2><span class="caret"></span>Designed for full customization</h2>
      <h2><span class="caret"></span>Flat HTML and CSS grid for full layout control</h2>
      <h2><span class="caret"></span>All features included in MIT license</h2>
    </span>
    <div class="get-started-container">
      <button @click="onGetStarted">Get Started</button>
    </div>
    <div class="flex-spacer"></div>
    <div class="badges">
      <a href="https://www.npmjs.com/package/data-grid-vue" target="_blank" aria-label="npm">
        <img alt="npm" src="https://img.shields.io/npm/v/data-grid-vue?logo=npm" />
      </a>
      <a href="https://github.com/nruffing/data-grid-vue/actions/workflows/ci_cd.yml">
        <img alt="CI/CD" src="https://github.com/nruffing/data-grid-vue/actions/workflows/ci_cd.yml/badge.svg" />
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
<hr />
<div class="features">
  <LandingFeature>
    <template #title>Native Vue3 Design</template>
    <template #description>This data grid is not a port from another framework or component. All design decisions were made for efficient use in a Vue application that feels natural.</template>
  </LandingFeature>
  <LandingFeature>
    <template #title>Flat HTML Architecture</template>
    <template #description>There is only a single layer of nesting for the data grid rows to be able to scroll. The rest of the HTML is flat and arranged with CSS grid. This allows for full layout control whether its rendered on an entire page or nested deep within a few flex containers.</template>
  </LandingFeature>
  <LandingFeature>
    <template #title>Full Customization</template>
    <template #description>Nearly every part of the data grid can be customized with a slot template. A custom data service can be provided to customize how data is retrieved, paged, sorted, and filtered. Included server-side data service has hooks for request and response contract mapping.</template>
  </LandingFeature>
  <LandingFeature>
    <template #title>Accessible</template>
    <template #description>All features and markup have correct setup to be fully screen-readable and keyboard-navigatable. This includes custom descriptions for screen readers to describe the current state of the data grid.</template>
  </LandingFeature>
  <LandingFeature>
    <template #title>Few Dependencies</template>
    <template #description>Entirely implemented using built-in browser functionality. The only dependencies used are flat, provide easier Vue access to browser APIs, and were split into another package to be leveraged on their own.</template>
    <template #badges>
      <a href="https://www.npmjs.com/package/dragon-drop-vue" target="_blank" aria-label="dragon drop vue">
        <img alt="dragon drop vue" src="https://img.shields.io/badge/npm-dragon--drop--vue-598F91?logo=npm">
      </a>
      <a href="https://www.npmjs.com/package/native-event-vue" target="_blank" aria-label="native event vue">
        <img alt="native event vue" src="https://img.shields.io/badge/npm-native--event--vue-598F91?logo=npm">
      </a>
    </template>
  </LandingFeature>
  <LandingFeature>
    <template #title>MIT License, Forever</template>
    <template #description>All features are included in the MIT license and free to use for commercial and personal use. We intend to keep this license and include all features free forever.</template>
  </LandingFeature>
</div>
<hr />

<script lang="ts" setup>
import { ref, inject, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const columns = ref<Column[]>([])
const data = ref<any[]>([])
const showNavLogo = ref(false)

function onScroll() {
  showNavLogo.value = window.scrollY > 150
}

onMounted(() => {
  const DEMO = inject('demo')
  columns.value = [...DEMO.columns]
  data.value = DEMO.data  

  window.addEventListener('scroll', onScroll)
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

const router = useRouter()
function onGetStarted() {
  router.push({ path: '/guide' })
}
</script>
