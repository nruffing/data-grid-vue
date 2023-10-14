<template>
  <main :class="{
    flex: isFlex,
    grid: !isFlex
  }">
    <div>
      <label>
        <input type="checkbox" v-model="isFlex" />
        Grid Unchecked / Flex Checked
      </label>
    </div>
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
import { defineComponent } from 'vue';

import DataGridVue from '../../lib/components/DataGridVue.vue'
import { type Column } from '../../lib/DataGridVue'

import { TestDataColumns, type TestDataItem } from '../test-data/test-data'
import { TestDataColumns2 } from '../test-data/test-data-2';
import MOCK_DATA from '../test-data/MOCK_DATA'

interface Data {
  isFlex: boolean,
}

export default defineComponent({
  name: 'GridView',
  components: {
    DataGridVue,
  },
  data(): Data {
    return {
      isFlex: false,
    }
  },
  computed: {
    testDataColumns(): Column[] {
      return TestDataColumns2
    },
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
</style>