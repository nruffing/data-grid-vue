<template>
  <main>
    <DataGridVue
      :data="mockData"
      :columns="testDataColumns"
      :sort-options="{
        sortable: true,
        multiColumn: true,
      }"
      :full-height="true"
    >
      <template v-slot:cell-actions="{ dataItem }">
        <button>Custom {{ dataItem.id }}</button>
      </template>
    </DataGridVue>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DataGridVue from '../../lib/components/DataGridVue.vue'
import { type Column } from '../../lib/DataGridVue'

import { TestDataColumns, type TestDataItem } from '../test-data/test-data'
import MOCK_DATA from '../test-data/MOCK_DATA'

export default defineComponent({
  name: 'FullHeightView',
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
  },
})
</script>

<style scoped>
main {
  height: calc(100vh - 40px);
}
</style>