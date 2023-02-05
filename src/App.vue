<template>
  <main>
    <DataGridVue
      :data="mockData2"
      :columns="testDataColumns2"
      :sort-options="{
        sortable: true,
        multiColumn: false,
      }"
    >
    </DataGridVue>
    
    <DataGridVue
      :data="mockData"
      :columns="testDataColumns"
      :sort-options="{
        sortable: true,
        multiColumn: true,
      }"
    >
      <template v-slot:cell-actions="{ dataItem }">
        <button>Custom {{ dataItem.id }}</button>
      </template>
    </DataGridVue>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DataGridVue from './components/DataGridVue.vue'
import type { Column } from './DataGridVue'

import { TestDataColumns, type TestDataItem } from './test-data/test-data'
import MOCK_DATA from './test-data/MOCK_DATA'

import { TestDataColumns2, type TestDataItem2 } from './test-data/test-data-2'
import MOCK_DATA_2 from './test-data/MOCK_DATA_2'

export default defineComponent({
  name: 'App',
  components: {
    DataGridVue,
  },
  computed: {
    testDataColumns(): Column[] {
      return TestDataColumns
    },
    mockData(): TestDataItem[] {
      return MOCK_DATA
    },

    testDataColumns2(): Column[] {
      return TestDataColumns2
    },
    mockData2(): TestDataItem2[] {
      return MOCK_DATA_2
    },
  },
})
</script>

<style>
body, html {
  margin: 0;
  background-color: black;
}
main {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
