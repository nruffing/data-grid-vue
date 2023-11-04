# Data Grid Vue

Customizable native Vue3 data grid with very limited dependencies. Leverages a flat html structure and CSS grid to allow full layout control.

<div class="badges">
  <a href="https://www.npmjs.com/package/data-grid-vue" target="_blank" aria-label="npm">
    <img alt="npm" src="https://img.shields.io/npm/v/data-grid-vue?logo=npm" />
  </a>
  <a href="https://github.com/nruffing/data-grid-vue/blob/main/LICENSE" target="_blank" aria-label="MIT License">
    <img alt="GitHub" src="https://img.shields.io/github/license/nruffing/data-grid-vue" />
  </a>
</div>

## Example

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="columns"
    :data="DEMO.data"
    :sort-options="{
      sortable: true,
      multiColumn: false,
    }"
    :allow-column-reorder="true"
    :show-column-selection="true"
  >
  </dgv-data-grid>
</div>

```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="DEMO.data"
  :sort-options="{
    sortable: true,
    multiColumn: false,
  }"
  :allow-column-reorder="true"
  :show-column-selection="true"
>
</dgv-data-grid>
```

<script lang="ts" setup>
import '@temp/data-grid-vue-style.css'
import { inject, ref } from 'vue'

const DEMO = inject('demo')

const columns = ref([...DEMO.columns])
</script>

<style scoped>
.grid-container {
  margin: calc(var(--spacer) * 3) 0;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}
</style>

!!!include(features.md)!!!
