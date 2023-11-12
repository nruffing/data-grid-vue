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

!!!include(simple-example-codeblock.md)!!!

<script lang="ts" setup>
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