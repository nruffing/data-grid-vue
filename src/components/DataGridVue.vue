<template>
  <div class="dgv-data-grid-container">
    <table class="dgv-data-grid">
      <tr class="dgv-data-grid-header-row">
        <td v-for="column in columns" :key="column.field.fieldName">
          {{ column.title ?? column.field.fieldName }}
        </td>
      </tr>
      <tr v-for="dataItem in displayedData" :key="keyColumn.field.resolveValue(dataItem)" class="dgv-data-grid-row">
        <td v-for="column in columns" :key="column.field.fieldName">
          {{ column.field.resolveValue(dataItem) }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DataType, Field, type Column } from '@/models/DataGridVue';
import { type DataService, StubDataService, ClientSideDataService } from '@/models/DataService';

interface Data {
  keyColumn: Column,
  displayedData: any[],
  totalItems: number,
  dataService: DataService,
  pageSize: number,
  currentPage: number,
}

export default defineComponent({
  name: 'DataGridVue',
  props: {
    data: {
     type: Array,
     required: false,
     default: undefined,
    },
    columns: {
      type: Array<Column>,
      required: true,
    },
    paged: {
      type: Boolean,
      required: false,
      default: true,
    },
    initialPageSize: {
      type: Number,
      required: false,
      default: 15,
    },
  },
  data(): Data {
    return {
      keyColumn: {
        dataType: DataType.alphanumeric,
        field: new Field(''),
      },
      displayedData: [],
      totalItems: 0,
      dataService: StubDataService,
      pageSize: 0,
      currentPage: 1,
    }
  },
  mounted() {
    this.pageSize = this.initialPageSize

    if (this.columns.length) {
      const firstKey = this.columns.find(c => c.isKey)
      if (!firstKey) {
        console.warn('No columns are specified as the key column')
      }
      this.keyColumn = firstKey ?? this.columns[0]
    } else {
      console.warn('No columns specified for data grid')
    }

    if (this.data) {
      this.dataService = new ClientSideDataService(this.data) 
    }

    if (this.paged) {
      this.loadPageData()
    } else if (this.data) {
      this.displayedData = this.data
    }
  },
  methods: {
    async loadPageData() {
      const pageData = await this.dataService.getPage(this.currentPage, this.pageSize)
      this.displayedData = pageData.dataItems
      this.totalItems = pageData.totalItems
    },
  },
})
</script>

<style scoped>

</style>