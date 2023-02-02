<template>
  <div class="dgv-data-grid-container" :class="{ 'dgv-full-width': fullWidth }">
    <table class="dgv-data-grid">
      <tr class="dgv-data-grid-header-row">
        <HeaderCell
          v-for="column in columns"
          :key="column.field.fieldName"
          :column="column"
          :sortable="sortOptions?.sortable"
          :sort="sort"
          @onClick="sortColumn" />
      </tr>
      <tr v-for="dataItem in displayedData" :key="keyColumn.field.resolveValue(dataItem)" class="dgv-data-grid-row">
        <td v-for="column in columns" :key="column.field.fieldName">
          <slot 
            :name="`cell-${column.field.fieldName}`"
            :data-item="dataItem"
          >
            {{ column.field.resolveValue(dataItem) }} 
          </slot>          
        </td>
      </tr>
    </table>
    <div class="dgv-footer">
      <PageNavigation
        v-if="paged"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total-items="totalItems" />
      <span class="dgv-total-items">{{ totalItems }} items</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { DataType, Field, type Column } from '@/DataGridVue'
import { type DataService, StubDataService, ClientSideDataService } from '@/DataService'
import { type Sort, type SortOptions, SortType } from '@/Sort'
import HeaderCell from './HeaderCell.vue'
import PageNavigation from './PageNavigation.vue'

interface Data {
  keyColumn: Column,
  displayedData: any[],
  totalItems: number,
  dataService: DataService,
  pageSize: number,
  currentPage: number,
  sort: Sort[],
}

export default defineComponent({
  name: 'DataGridVue',
  components: {
    HeaderCell,
    PageNavigation,
  },
  props: {
    data: {
     type: Array,
     required: false,
     default: undefined,
    },
    customDataService: {
      type: Object as PropType<DataService>,
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
    sortOptions: {
      type: Object as PropType<SortOptions>,
      required: false,
      default: undefined,
    },
    fullWidth: {
      type: Boolean,
      required: false,
      default: true,
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
      sort: [],
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

    if (this.customDataService) {
      this.dataService = this.customDataService
    } else if (this.data) {
      this.dataService = new ClientSideDataService(this.data) 
    }

    if (this.paged) {
      this.loadPageData()
    } else if (this.data) {
      this.displayedData = this.data
    }
  },
  watch: {
    currentPage() {
      this.loadPageData()
    },
  },
  methods: {
    async loadPageData() {
      const pageData = await this.dataService.getPage(this.currentPage, this.pageSize, this.sort)
      this.displayedData = pageData.dataItems
      this.totalItems = pageData.totalItems
    },
    sortColumn(column: Column) {
      if (!this.sortOptions?.sortable || !column.sortable) {
        return
      }

      const newSort = {
        fieldName: column.field.fieldName,
        dataType: column.dataType,
        type: SortType.ascending,
      }

      const existingSort = this.sort?.find(s => s.fieldName === newSort.fieldName)
      if (existingSort) {
        if (existingSort.type === SortType.ascending) {
          existingSort.type = SortType.descending
        } else {
          this.sort = this.sort.filter(s => s.fieldName !== newSort.fieldName)
        }
      } else {
        if (this.sortOptions.multiColumn) {
          this.sort.push(newSort)
        } else {
          this.sort = [newSort]
        }
      }

      this.loadPageData()
    }
  },
})
</script>