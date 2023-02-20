<template>
  <div class="dgv-data-grid-container" :class="{ 'dgv-full-width': fullWidth }">
    <div class="dgv-options-header">
      <span 
        v-if="filterable"
        class="dgv-action-text"
        tabindex="0"
        @click="filterOptionsShown = !filterOptionsShown"
      >
        <Icon name="filter" />
        <span>{{ filterOptionsShown ? 'Hide' : 'Show' }} Filter Options</span>
      </span>
    </div>
    <table class="dgv-data-grid">
      <tr class="dgv-data-grid-header-row">
        <HeaderCell
          v-for="column in columns"
          :key="column.field.fieldName"
          :column="column"
          :sortable="sortOptions?.sortable"
          :sort="sort"
          @onClick="sortColumn"
        />
      </tr>
      <tr 
        v-if="filterOptionsShown"
        class="dgv-filter-options-row"
      >
        <td v-for="column in columns" :key="column.field.fieldName">
          <slot
            :name="`filter-${column.field.fieldName}`"
            :column="column"
          >
            <HeaderFilter
              v-if="column.filterable"
              :column="column"
              @updated="onFilterUpdated"
            />
            </slot>
        </td>
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
import { type DataService, StubDataService, ClientSideDataService, type ServerSideDataServiceOptions, ServerSideDataService } from '@/DataService'
import { type Sort, type SortOptions, SortType } from '@/Sort'
import type { Filter, FilterCondition } from '@/Filter'
import HeaderCell from './HeaderCell.vue'
import HeaderFilter from './HeaderFilter.vue'
import PageNavigation from './PageNavigation.vue'
import Icon from './Icon.vue'

interface Data {
  keyColumn: Column,
  displayedData: any[],
  totalItems: number,
  dataService: DataService,
  pageSize: number,
  currentPage: number,
  sort: Sort[],
  filters: FilterCondition[],
  filterOptionsShown: boolean,
}

export default defineComponent({
  name: 'DataGridVue',
  components: {
    HeaderCell,
    HeaderFilter,
    PageNavigation,
    Icon,
  },
  props: {
    data: {
     type: Array,
     required: false,
     default: undefined,
    },
    serverSideOptions: {
      type: Object as PropType<ServerSideDataServiceOptions>,
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
      filters: [],
      filterOptionsShown: false,
    }
  },
  computed: {
    filterable(): boolean {
      return !!this.columns.find(c => c.filterable)
    },
    filter(): Filter | undefined {
      if (!this?.filters.length) {
        return undefined
      }
      let filter = {
        or: [this.filters[0]],
        and: undefined,
      } as Filter
      for (var i = 1; i < this.filters.length; i++) {
        filter = {
          or: [this.filters[i]],
          and: filter,
        }
      }
      return filter
    },
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
      console.error('No columns specified for data grid')
    }

    if (this.customDataService) {
      this.dataService = this.customDataService
    } else if (this.serverSideOptions) {
      this.dataService = new ServerSideDataService(this.serverSideOptions)
    } else if (this.data) {
      this.dataService = new ClientSideDataService(this.data) 
    } else {
      console.error('data, serverSideOptions, or customDataService prop needs to be set to populate the grid with data')
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
      const pageData = await this.dataService.getPage(this.currentPage, this.pageSize, this.sort, this.filter)
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
    },
    onFilterUpdated(condition: FilterCondition) {
      if (!condition.value) {
        this.filters = this.filters.filter(f => f.fieldName !== condition.fieldName)
      } else {
        const filter = this.filters.find(f => f.fieldName === condition.fieldName)
        if (filter) {
          filter.value = condition.value
          filter.operator = condition.operator
        } else {
          this.filters.push(condition)
        }
      }
      this.loadPageData()
    },
  },
})
</script>