<template>
  <main>
    <!-- Full page grid directly in main element -->
    <dgv-data-grid
      :server-side-options="{
        postRoute: 'https://example-api.datagridvue.com/GridData/GetPageData',
        beforeRequest: onBeforeRequest,
      }"
      :columns="testDataColumns2"
      :sort-options="{
        sortable: true,
        multiColumn: false,
      }"
      :server-side-storage-options="{
        userId: 'dev-app-user-1',
        gridId: 'home-view-grid-1',
        getPostRoute: 'https://example-api.datagridvue.com/GridState/Get',
        setPostRoute: 'https://example-api.datagridvue.com/GridState/Set',
      }"
    >
      <template v-slot:filter-phoneNumber="{ column, initialFilterCondition, onFilterUpdated }">
        <div class="custom-filter">
          <input
            type="tel"
            :value="formatPhoneNumber(initialFilterCondition?.value)"
            @input="onPhoneNumberFilterInput($event, onFilterUpdated)"
            aria-label="Filter Phone Number"
          />
        </div>
      </template>
    </dgv-data-grid>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { DataType, type Column } from '../../../lib/DataGridVue'
import { FilterOperator, type FilterCondition } from '../../../lib/Filter'

import { TestDataColumns2, formatPhoneNumber } from '../test-data/test-data-2'

export default defineComponent({
  name: 'HomeView',
  computed: {
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
      const strippedValue = rawValue.replace(/\D/g, '')

      onFilterUpdated({
        fieldName: 'phoneNumber',
        operator: FilterOperator.equals,
        dataType: DataType.number,
        value: strippedValue,
      })
    },
  },
})
</script>

<style scoped>
main > div {
  height: 100%;
}
</style>
