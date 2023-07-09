<template>
  <div
    ref="container"
    class="dgv-data-grid-container"
    :class="{ 
      'dgv-full-width': fullWidth,
      'dgv-full-height': fullHeight,
    }"
  >
    <div 
      ref="optionsHeader"
      class="dgv-options-header"
    >
      <span 
        v-if="filterable"
        class="dgv-action-text"
        tabindex="0"
        @click="onToggleFilterOptionsShown"
      >
        <Icon name="filter" />
        <span>{{ filterOptionsShown ? 'Hide' : 'Show' }} Filter Options</span>
      </span>
    </div>
    <table 
      ref="table"
      class="dgv-data-grid"
    >
      <thead ref="header">
        <tr class="dgv-data-grid-header-row">
          <HeaderCell
            v-for="column in columns"
            :key="column.field.fieldName"
            :column="column"
            :sortable="sortOptions?.sortable"
            :sort="sort"
            :inline-style="{ width: columnWidthMap.get(column.field.fieldName) }"
            @onClick="sortColumn"
          />
        </tr>
        <tr 
          v-if="filterOptionsShown"
          class="dgv-filter-options-row"
        >
          <td 
            v-for="column in columns"
            :key="column.field.fieldName"
            :style="{ width: columnWidthMap.get(column.field.fieldName) }"
          >
            <slot
              :name="`filter-${column.field.fieldName}`"
              :column="column"
              :initialFilterCondition="getFilterCondition(column.field.fieldName)"
              :onFilterUpdated="onFilterUpdated"
            >
              <HeaderFilter
                v-if="column.filterable"
                :column="column"
                :initialFilterCondition="getFilterCondition(column.field.fieldName)"
                @updated="onFilterUpdated"
              />
            </slot>
          </td>
        </tr>
      </thead>
      <tbody :style="tbodyStyle">
        <tr v-for="dataItem in displayedData" :key="keyColumn.field.resolveValue(dataItem)" class="dgv-data-grid-row">
          <td 
            v-for="column in columns"
            :key="column.field.fieldName"
            :style="{ width: columnWidthMap.get(column.field.fieldName) }"
          >
            <slot 
              :name="`cell-${column.field.fieldName}`"
              :data-item="dataItem"
            >
              {{ column.field.resolveValue(dataItem) }} 
            </slot>          
          </td>
        </tr>
      </tbody>
    </table>
    <div 
      ref="footer"  
      class="dgv-footer"
    >
      <PageNavigation
        v-if="paged"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total-items="totalItems" />
      <select
        v-if="paged && pageSizes?.length > 1"
        v-model="pageSize"
        @change="onPageSizeChanged"
      >
        <option
          v-for="pageSize in pageSizes"
          :value="pageSize">
          {{ pageSize }}
        </option>
      </select>
      <span class="dgv-total-items">{{ totalItems }} items</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, nextTick } from 'vue'
import { debounce } from 'debounce'
import { DataType, Field, type Column } from '../DataGridVue'
import { type DataService, StubDataService, ClientSideDataService, type ServerSideDataServiceOptions, ServerSideDataService } from '../DataService'
import { type Sort, type SortOptions, SortType } from '../Sort'
import type { Filter, FilterCondition } from '../Filter'
import type { InlineStyle } from '../InlineStyle'
import { getElementHeight } from '../Html'
import { calculateColumnWidths } from '../ColumnWidth'
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
  externalFilter: Filter | undefined,
  windowResizeDebounce?: any,
  tbodyStyle: InlineStyle,
  columnWidthMap: Map<string, string>,
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
    pageSizes: {
      type: Array<Number>,
      required: false,
      default: [15, 25, 50],
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
    fullHeight: {
      type: Boolean,
      required: false,
      default: false,
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
      externalFilter: undefined,
      windowResizeDebounce: undefined,
      tbodyStyle: {},
      columnWidthMap: new Map<string, string>(),
    }
  },
  computed: {
    filterable(): boolean {
      return !!this.columns.find(c => c.filterable)
    },
    filter(): Filter | undefined {
      if (this.externalFilter) {
        return this.externalFilter
      }
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
  async mounted() {
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
      await this.loadPageData()
    } else if (this.data) {
      this.displayedData = this.data
    }

    this.windowResizeDebounce = debounce(this.onWindowResize, 50)
    window.addEventListener('resize', this.windowResizeDebounce)

    nextTick(() => {
      this.calculateColumnWidths()
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.windowResizeDebounce)
    this.windowResizeDebounce?.clear()
    this.windowResizeDebounce = undefined
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
      nextTick(() => {
        this.calculateDynamicStyles()
      })        
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
    async onPageSizeChanged() {
      const numPages = Math.ceil(this.totalItems / this.pageSize)
      if (this.currentPage > numPages) {
        this.currentPage = numPages
      }
      await this.loadPageData()
    },
    onToggleFilterOptionsShown() {
      this.filterOptionsShown = !this.filterOptionsShown
      nextTick(() => {
        this.calculateDynamicStyles()
      })
    },
    getFilterCondition(fieldName: string): FilterCondition | undefined {
      return this.filters.find(f => f.fieldName === fieldName)
    },
    onFilterUpdated(condition: FilterCondition) {
      if (!condition.value) {
        this.filters = this.filters.filter(f => f.fieldName !== condition.fieldName)
      } else {
        const filter = this.getFilterCondition(condition.fieldName)
        if (filter) {
          filter.value = condition.value
          filter.operator = condition.operator
        } else {
          this.filters.push(condition)
        }
      }
      this.loadPageData()
    },
    setFilter(filter: Filter | undefined) {
      this.externalFilter = filter
      this.loadPageData()
    },
    onWindowResize() {
      this.calculateColumnWidths()
      this.calculateDynamicStyles()
    },
    calculateColumnWidths() {
      this.columnWidthMap = calculateColumnWidths(this.columns, this.$refs.table as HTMLElement)
    },
    calculateDynamicStyles() {
      if (!this.fullHeight) {
        // currently there are only dynamic styles when using full height mode
        this.tbodyStyle = {}
        return
      }

      const container = this.$refs.container as HTMLElement
      const parent = container?.parentElement
      const optionsHeader = this.$refs.optionsHeader as HTMLElement
      const header = this.$refs.header as HTMLElement
      const footer = this.$refs.footer as HTMLElement
      if (!container || !parent || !optionsHeader || !header || !footer) {
        return
      }

      const parentStyle = getComputedStyle(parent)
      const padding = Number.parseFloat(parentStyle.paddingBottom) + Number.parseFloat(parentStyle.paddingTop)
      const margin = Number.parseFloat(parentStyle.marginBottom) + Number.parseFloat(parentStyle.marginTop)
      const tbodyHeight = parent.clientHeight - padding - margin - getElementHeight(optionsHeader) - header.clientHeight - footer.clientHeight
      this.tbodyStyle = {
        height: `${tbodyHeight}px`,
      } as InlineStyle
    }
  },
})
</script>