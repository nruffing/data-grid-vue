<template>
  <main>
    <DataGridVue
      :server-side-options="{
        postRoute: 'https://localhost:7179/DataGridVue',
        beforeRequest: onBeforeRequest,
      }"
      :columns="testDataColumns2"
      :sort-options="{
        sortable: true,
        multiColumn: false,
      }"
    >
      <template v-slot:filter-phoneNumber="{ column, initialFilterCondition, onFilterUpdated }">
        <div class="custom-filter">
          <input type="tel" :value="formatPhoneNumber(initialFilterCondition?.value)" @input="onPhoneNumberFilterInput($event, onFilterUpdated)" />
        </div>
      </template>
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
import { DataType, type Column } from './DataGridVue'
import { FilterOperator, type FilterCondition } from './Filter'

import { TestDataColumns, type TestDataItem } from './test-data/test-data'
import MOCK_DATA from './test-data/MOCK_DATA'

import { TestDataColumns2, formatPhoneNumber } from './test-data/test-data-2'

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
  },
  methods: {
    onBeforeRequest(request: Request): Promise<Request> {
      console.log(request)
      return Promise.resolve(request)
    },
    formatPhoneNumber(phoneNumber: number | undefined): string {
      return formatPhoneNumber(phoneNumber)
    },
    onPhoneNumberFilterInput(event: Event, onFilterUpdated: (o: FilterCondition) => void) {
      const input = event.target as HTMLInputElement
      const rawValue = input.value
      const strippedValue = rawValue.replace(/\D/g,'');

      onFilterUpdated({ 
        fieldName: 'phoneNumber',
        operator: FilterOperator.equals,
        dataType: DataType.number,
        value: strippedValue,
      })
    }
  },
})
</script>

<style>
body, html {
  margin: 0;
  background-color: rgb(40, 69, 97);
}

main {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.custom-filter {
  display: flex;
  flex-direction: column;
  justify-content: end;
  height: 100%;
}
</style>
