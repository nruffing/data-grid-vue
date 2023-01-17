<template>
  <main>
    <DataGridVue
      :data="mockData"
      :columns="testDataColumns"
      :sort-options="{
        sortable: true,
        multiColumn: false,
      }">    
    </DataGridVue>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import DataGridVue from './components/DataGridVue.vue'
import type { Column } from './models/DataGridVue'

import { TestDataColumns, type TestDataItem } from './test-data/test-data'
import MOCK_DATA from './test-data/MOCK_DATA'

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
    }
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
}
</style>
