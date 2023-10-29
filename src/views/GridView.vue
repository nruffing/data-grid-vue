<template>
  <main
    :class="{
      flex: isFlex,
      grid: !isFlex,
    }"
  >
    <div class="options">
      <label>
        <input
          type="checkbox"
          v-model="isFlex"
          name="is-grid"
        />
        Grid Unchecked / Flex Checked
      </label>
      <label>
        <input
          type="checkbox"
          v-model="allowColumnReorder"
          name="allow-column-reorder"
        />
        Column Reorder
      </label>
    </div>
    <dgv-data-grid
      :data="mockData"
      v-model:columns="columns"
      :sort-options="{
        sortable: true,
        multiColumn: true,
      }"
      :allowColumnReorder="allowColumnReorder"
      :showColumnSelection="true"
    >
      <template v-slot:cell-actions="{ dataItem }">
        <button>Custom {{ dataItem.id }}</button>
      </template>
    </dgv-data-grid>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { type Column } from '../../lib/DataGridVue'

import { TestDataColumns, type TestDataItem } from '../test-data/test-data'
import MOCK_DATA from '../test-data/MOCK_DATA'

interface Data {
  isFlex: boolean
  allowColumnReorder: boolean
  columns: Column[]
}

export default defineComponent({
  name: 'GridView',
  data(): Data {
    return {
      isFlex: false,
      allowColumnReorder: true,
      columns: [...TestDataColumns],
    }
  },
  computed: {
    mockData(): TestDataItem[] {
      return MOCK_DATA
    },
  },
})
</script>

<style scoped>
main.flex {
  display: flex;
  flex-direction: column;
}

main.grid {
  display: grid;
  grid-template-rows: auto 1fr;
}

.options {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
</style>
