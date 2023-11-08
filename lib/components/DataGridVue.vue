<template>
  <div
    ref="container"
    class="dgv-data-grid-container"
    :style="{
      gridTemplateColumns: gridTemplateColumns,
      gridTemplateRows: gridTemplateRows,
    }"
  >
    <!-- OPTIONS HEADER -->
    <div
      class="dgv-options-header"
      :style="{
        gridColumnEnd: cssColumnSpanValue,
      }"
    >
      <slot
        name="options-header"
        :toggleFilterOptionsShown="toggleFilterOptionsShown"
        :toggleColumnSelectionShown="toggleColumnSelectionShown"
      >
        <slot
          name="options-header-filter-options-shown"
          :toggleFilterOptionsShown="toggleFilterOptionsShown"
        >
          <span
            v-if="filterable"
            class="dgv-action-text"
            tabindex="0"
            @click="toggleFilterOptionsShown"
          >
            <Icon name="filter" />
            <span>{{ filterOptionsShown ? 'Hide' : 'Show' }} Filter Options</span>
          </span>
        </slot>
        <slot
          name="options-header-clear-filters"
          :clearFilters="clearFilters"
        >
          <span
            v-if="filterable"
            class="dgv-action-text"
            tabindex="0"
            @click="clearFilters"
          >
            <Icon name="clear-filter" />
            <span>Clear Filters</span>
          </span>
        </slot>
        <slot
          name="options-header-column-selection-shown"
          :toggleColumnSelectionShown="toggleColumnSelectionShown"
        >
          <span
            v-if="showColumnSelection"
            id="dgv-id-add-remove-columns"
            class="dgv-action-text"
            tabindex="0"
            @click="toggleColumnSelectionShown($event)"
          >
            <Icon name="add-column" />
            <span>Add/Remove Columns</span>
          </span>
        </slot>
      </slot>
    </div>

    <!-- HEADER CELLS -->
    <HeaderCell
      v-for="column in displayedColumns"
      :key="column.field.fieldName"
      :column="column"
      :sortable="sortOptions?.sortable"
      :sort="sort"
      @onClick="sortColumn"
      v-dgv-drag="allowColumnReorder ? { dragData: column, dropEffect: 'move', onDragStart } : false"
      v-dgv-drop="allowColumnReorder ? { dragData: column, dropEffect: 'move', onDragEnter, onDrop } : false"
    />

    <!-- HEADER FILTERS -->
    <div
      v-if="filterOptionsShown"
      v-for="column in displayedColumns"
      :key="column.field.fieldName"
      class="dgv-filter-options-cell"
    >
      <slot
        :name="`filter-${column.field.fieldName}`"
        :column="column"
        :initialFilterCondition="getFilterCondition(column.field.fieldName)"
        :onFilterUpdated="onFilterUpdated"
      >
        <HeaderFilter
          ref="headerFilter"
          :column="column"
          :initialFilterCondition="getFilterCondition(column.field.fieldName)"
          @updated="onFilterUpdated"
        />
      </slot>
    </div>

    <!-- DATA CELLS -->
    <div
      class="dgv-data-grid-body"
      :style="{
        gridColumnEnd: cssColumnSpanValue,
        gridTemplateColumns: gridTemplateColumns,
        gridTemplateRows: gridBodyTemplateRows,
      }"
    >
      <template
        v-for="(dataItem, index) in displayedData"
        :key="keyColumn.field.resolveValue(dataItem)"
      >
        <div
          v-for="column in displayedColumns"
          :key="column.field.fieldName"
          class="dgv-data-grid-cell"
          :class="{
            'dgv-data-grid-row-alt': index % 2 === 0,
          }"
        >
          <slot
            :name="`cell-${column.field.fieldName}`"
            :data-item="dataItem"
          >
            {{ column.field.resolveValue(dataItem) }}
          </slot>
        </div>
      </template>
    </div>

    <!-- FOOTER -->
    <div
      class="dgv-footer"
      :style="{
        gridColumnEnd: cssColumnSpanValue,
      }"
    >
      <PageNavigation
        v-if="paged"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total-items="totalItems"
      />
      <select
        v-if="paged && pageSizes?.length > 1"
        v-model="pageSize"
        name="dgv-page-size-select"
        @change="onPageSizeChanged"
      >
        <option
          v-for="pageSize in pageSizes"
          :value="pageSize"
        >
          {{ pageSize }}
        </option>
      </select>
      <span class="dgv-total-items">{{ totalItems }} items</span>
    </div>

    <!-- Column Selection Popup -->
    <Transition name="dgv-fade">
      <div
        class="dgv-popup"
        v-if="popupOptions"
        :style="popupOptions"
        v-dgv-click-outside="{
          handler: () => (popupOptions = undefined),
          ignoreSelectors: '#dgv-id-add-remove-columns',
        }"
      >
        <slot
          name="column-selection-popup"
          :columns="columns"
          :hiddenUpdated="hiddenUpdated"
        >
          <ColumnSelectionItem
            v-for="column in columns"
            :key="column.field.fieldName"
            :column="column"
            @hidden-updated="hiddenUpdated(column, $event)"
          />
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, nextTick } from 'vue'
import { debounce } from 'debounce'
import { DataType, Field, type Column } from '../DataGridVue'
import { type DataService, StubDataService, ClientSideDataService, type ServerSideDataServiceOptions, ServerSideDataService } from '../DataService'
import { type Sort, type SortOptions, SortType } from '../Sort'
import type { Filter, FilterCondition } from '../Filter'
import { calculateColumnWidths } from '../ColumnWidth'
import HeaderCell from './HeaderCell.vue'
import HeaderFilter from './HeaderFilter.vue'
import PageNavigation from './PageNavigation.vue'
import Icon from './Icon.vue'
import ColumnSelectionItem from './ColumnSelectionItem.vue'
import type { DragonDropVueDragOptions, DragonDropVueOptions } from 'dragon-drop-vue'
import { asPxSize } from '../Html'
import {
  type ServerSideStorageServiceOptions,
  type StorageService,
  StubStorageService,
  SessionStorageService,
  LocalStorageService,
  LocalStorageType,
  ServerSideStorageService,
  type GridState,
} from '../Storage'

interface Data {
  keyColumn: Column
  displayedData: any[]
  totalItems: number
  dataService: DataService
  pageSize: number
  currentPage: number
  sort: Sort[]
  filters: FilterCondition[]
  filterOptionsShown: boolean
  externalFilter: Filter | undefined
  windowResizeDebounce: any | undefined
  columnWidths: string[]
  draggingColumn: Column | undefined
  popupOptions:
    | {
        top: string
        right: string
      }
    | undefined
  storageService: StorageService
}

/**
 * @group Data Grid Component
 * @description Main entrypoint component to render a data grid.
 */
export default defineComponent({
  name: 'DataGridVue',
  components: {
    HeaderCell,
    HeaderFilter,
    PageNavigation,
    Icon,
    ColumnSelectionItem,
  },
  props: {
    /**
     * @description Array of objects to display in the data grid when using the built-in {@link ClientSideDataService}.
     * This prop is required unless serverSideOptions or customDataService is supplied. The order of precedence
     * is {@link customDataService}, {@link serverSideOptions}, and then {@link data}.
     * The data grid will not react and rerender when this property changes. If that functionaly is needed it is recommended
     * to leverage `v-if` to force a new component instance to render.
     * @defaultValue undefined
     */
    data: {
      type: Array as PropType<any[]>,
      required: false,
      default: undefined,
    },

    /**
     * @description Options to configure the built-in server-side data service including the POST url and optional
     * callbacks to alter the data format of the request and response allowing. This allows the built-in data service
     * to handle the data contract of any server. {@link ServerSideDataService} is used unless {@link customDataService}
     * is also specified.
     * @see {@link https://www.nuget.org/packages/DataGridVueDotnet/0.0.1-alpha | dotnet IQueryable helpers}
     * @defaultValue undefined
     */
    serverSideOptions: {
      type: Object as PropType<ServerSideDataServiceOptions>,
      required: false,
      default: undefined,
    },

    /**
     * @description Custom implementation of {@link DataService} to supply the grid's data. When this is specified
     * {@link data} and {@link serverSideOptions} are ignored.
     * @defaultValue undefined
     */
    customDataService: {
      type: Object as PropType<DataService>,
      required: false,
      default: undefined,
    },

    /**
     * @description {@link Column} definitions to configure data grid columns including header title, column width, custom data getter,
     * and column specific filtering and sorting options. It is recommended to supply an array of objects with `v-model:columns` since
     * that is required for column reordering and allowing users to show/hide specific columns to rerender the columns.
     * {@link Column} objects will not be mutated but a new array will be emitted with the `update:columns` event and that needs to trigger
     * this property to get an updated value. The grid will react to any change to this prop which can be leveraged to implement custom
     * functionality to do things like allowing users to add/remove columns.
     */
    columns: {
      type: Array as PropType<Column[]>,
      required: true,
    },

    /**
     * @description Whether to allow columns to be reordered using drag-and-drop
     * powered by {@link https://www.npmjs.com/package/dragon-drop-vue | drag-drop-vue}.
     * In order for columns to rerender after dropping {@link columns} should be passed using `v-model:columns`.
     * @defaultValue false
     */
    allowColumnReorder: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * @description Whether the data grid should be paged. When this is `false` {@link PageDataRequest.pageNum} and
     * {@link PageDataRequest.pageSize} will be -1.
     * @defaultValue true
     */
    paged: {
      type: Boolean,
      required: false,
      default: true,
    },

    /**
     * @description The page size to use when the grid initially loads.
     * @defaultValue 15
     */
    initialPageSize: {
      type: Number,
      required: false,
      default: 15,
    },

    /**
     * @description The page sizes to allow the user to select between. The page size select
     * will only be displayed if this array contains more then one value.
     * @defaultValue [15, 25, 50]
     */
    pageSizes: {
      type: Array as PropType<number[]>,
      required: false,
      default: [15, 25, 50],
    },

    /**
     * @description Grid-level {@link SortOptions} including whether to allow sorting and if more then
     * one column can be sorted at a time. The grid must be set as sortable for any column level sort
     * options to take effect.
     * @defaultValue undefined
     */
    sortOptions: {
      type: Object as PropType<SortOptions>,
      required: false,
      default: undefined,
    },

    /**
     * @description Whether to display the `Add/Remove Columns` menu in the options header. Column selection
     * can be set externally using the {@link Column.hidden} property. For this functionality to work correctly
     * {@link columns} should be passed using `v-model:columns`.
     * @defaultValue false
     */
    showColumnSelection: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * @description A key to use to save grid state in {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage | localStorage}
     * or {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage | sessionStorage}.
     * sessionStorage is used unless {@link localStorageType} is specified. The data
     * that is saved as part of the grid state is defined in {@link GridState}.
     * This is ignored if {@link serverSideStorageOptions} or {@link customStorageService} is specified.
     * @see {@link SessionStorageService}
     * @see {@link LocalStorageService}
     * @defaultValue ''
     */
    storageKey: {
      type: String,
      required: false,
      default: '',
    },

    /**
     * @description Whether grid state is stored in {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage | localStorage}
     * or {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage | sessionStorage}.
     * To save grid state {@link storageKey} must be specified.The data
     * that is saved as part of the grid state is defined in {@link GridState}.
     * This is ignored if {@link serverSideStorageOptions} or {@link customStorageService} is specified.
     * @see {@link SessionStorageService}
     * @see {@link LocalStorageService}
     * @defaultValue LocalStorageType.sessionStorage
     */
    localStorageType: {
      type: Number,
      required: false,
      default: LocalStorageType.sessionStorage,
    },

    /**
     * @description Options to specify to use {@link ServerSideStorageService} to retrieve and store {@link GridState}
     * {@link storageKey} and {@link localStorageType} are ignored if this is specified. This is ignored if
     * {@link customStorageService} is specified.
     * @see {@link ServerSideStorageServiceOptions}
     * @defaultValue undefined
     */
    serverSideStorageOptions: {
      type: Object as PropType<ServerSideStorageServiceOptions>,
      required: false,
      default: undefined,
    },

    /**
     * @description Custom implementation of {@link StorageService} to optionally retrieve/store {@link GridState}.
     * When this is specified {@link storageKey}, {@link localStorageType}, and {@link serverSideStorageOptions} are ignored.
     * @defaultValue undefined
     */
    customStorageService: {
      type: Object as PropType<StorageService>,
      required: false,
      default: undefined,
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
      columnWidths: [],
      draggingColumn: undefined,
      popupOptions: undefined,
      storageService: StubStorageService,
    }
  },
  computed: {
    displayedColumns(): Column[] {
      return this.columns.filter(c => !c.hidden)
    },
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
    gridTemplateColumns(): string {
      return this.columnWidths.join(' ')
    },
    gridTemplateRows(): string {
      return this.filterOptionsShown
        ? 'auto auto auto 1fr auto' // dgv-options-header dgv-header-cell dgv-data-grid-body dgv-footer
        : 'auto auto 1fr auto' // dgv-options-header dgv-header-cell dgv-filter dgv-data-grid-body dgv-footer
    },
    gridBodyTemplateRows(): string {
      return 'auto '.repeat(this.pageSize)
    },
    cssColumnSpanValue(): string {
      return `span ${this.displayedColumns.length}`
    },
    gridState(): GridState {
      return {
        pageSize: this.pageSize,
        hiddenFields: this.columns.filter(c => c.hidden).map(c => c.field.fieldName),
        sort: this.sort,
        filters: this.filters,
        externalFilter: this.externalFilter,
        columnOrder: this.columns.map(c => c.field.fieldName),
      }
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

    if (this.customStorageService) {
      this.storageService = this.customStorageService
    } else if (this.serverSideStorageOptions) {
      this.storageService = new ServerSideStorageService(this.serverSideStorageOptions)
    } else if (this.storageKey) {
      this.storageService =
        this.localStorageType === LocalStorageType.localStorage
          ? new LocalStorageService(this.storageKey)
          : new SessionStorageService(this.storageKey)
    }

    const gridState = await this.storageService.getGridState()
    if (gridState) {
      this.setGridState(gridState)
    }

    await this.loadPageData()

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
    columns() {
      nextTick(() => {
        this.calculateColumnWidths()
      })
    },
  },
  methods: {
    async loadPageData() {
      const pageData = await this.dataService.getPage(this.paged ? this.currentPage : -1, this.paged ? this.pageSize : -1, this.sort, this.filter)
      this.displayedData = pageData.dataItems
      this.totalItems = pageData.totalItems
    },
    setGridState(gridState: GridState) {
      const columnSet = new Set<string>(this.columns.map(c => c.field.fieldName))

      this.pageSize = gridState.pageSize
      this.externalFilter = gridState.externalFilter

      for (const sort of gridState.sort) {
        if (columnSet.has(sort.fieldName)) {
          this.sort.push(sort)
        }
      }

      for (const filter of gridState.filters) {
        if (columnSet.has(filter.fieldName)) {
          this.filters.push(filter)
        }
      }

      if (gridState.hiddenFields.length || gridState.columnOrder.length) {
        let clones = this.columns.map(c => {
          return { ...c }
        })
        const columns = [] as Column[]
        for (const fieldName of gridState.columnOrder) {
          const clone = clones.find(c => c.field.fieldName === fieldName)
          if (clone) {
            columns.push(clone)
            clones = clones.filter(c => c.field.fieldName !== fieldName)
          }
        }
        for (const clone of clones) {
          columns.push(clone)
        }
        for (const fieldName of gridState.hiddenFields) {
          const col = columns.find(c => c.field.fieldName === fieldName)
          if (col) {
            col.hidden = true
          }
        }
        this.$emit('update:columns', columns)
      }
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
      this.saveGridState()
    },
    async onPageSizeChanged() {
      const numPages = Math.ceil(this.totalItems / this.pageSize)
      if (this.currentPage > numPages) {
        this.currentPage = numPages
      }
      await this.loadPageData()
      this.saveGridState()
    },
    toggleFilterOptionsShown() {
      this.filterOptionsShown = !this.filterOptionsShown
    },
    clearFilters() {
      if (this.filters.length || this.externalFilter) {
        this.filters = []
        this.externalFilter = undefined
        for (const headerFilter of this.$refs.headerFilter as (typeof HeaderFilter)[]) {
          headerFilter.clearFilter()
        }
        this.loadPageData()
        this.saveGridState()
      }
    },
    toggleColumnSelectionShown(event: MouseEvent) {
      if (this.popupOptions) {
        this.popupOptions = undefined
        return
      }

      const element = event.target as HTMLElement
      const elementRect = element.getBoundingClientRect()
      this.popupOptions = {
        top: asPxSize(elementRect.bottom + 5),
        right: asPxSize(window.innerWidth - elementRect.right),
      }
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
      this.saveGridState()
    },
    setFilter(filter: Filter | undefined) {
      this.externalFilter = filter
      this.loadPageData()
    },
    onWindowResize() {
      this.calculateColumnWidths()
    },
    calculateColumnWidths() {
      this.columnWidths = calculateColumnWidths(this.columns, this.$refs.container as HTMLElement)
    },
    onDragStart(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<Column>, options: DragonDropVueOptions) {
      this.draggingColumn = dragOptions.dragData
    },
    onDragEnter(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<Column>, options: DragonDropVueOptions) {
      // do not allow dropping column onto itself
      return this.draggingColumn?.field.fieldName !== dragOptions.dragData?.field.fieldName
    },
    onDrop(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<Column>, options: DragonDropVueOptions) {
      // do not allow dropping column onto itself
      const dropFieldName = dragOptions.dragData?.field.fieldName
      const dragFieldName = this.draggingColumn?.field.fieldName

      if (!dropFieldName || !dragFieldName || dragFieldName === dropFieldName) {
        return false
      }

      const newColumnOrder = [] as Column[]
      let dragFound = false
      for (const column of this.columns) {
        /*
         * if we are at the column being dropped on (i.e. shifted right)
         */
        if (column.field.fieldName === dropFieldName) {
          /*
           * If the column is being dragged forward insert the drop column before the drag column
           */
          if (dragFound) {
            newColumnOrder.push(column)
          }
          newColumnOrder.push(this.draggingColumn!)
          /*
           * Otherwise, insert the drag column first
           */
          if (!dragFound) {
            newColumnOrder.push(column)
          }
        } else {
          /*
           * If this is drag column, ignore it and track that we found it.
           */
          if (column.field.fieldName === dragFieldName) {
            dragFound = true
          } else {
            /*
             * Else, just add the current column
             */
            newColumnOrder.push(column)
          }
        }
      }

      this.$emit('update:columns', newColumnOrder)
      this.saveGridState()
    },
    hiddenUpdated(column: Column, hidden: boolean) {
      const columns = []
      for (const col of this.columns) {
        const newColumn = { ...col }
        if (col.field.fieldName === column.field.fieldName) {
          newColumn.hidden = hidden
        }
        columns.push(newColumn)
      }
      this.$emit('update:columns', columns)
      this.saveGridState()
    },
    saveGridState() {
      nextTick(() => {
        this.storageService.setGridState(this.gridState)
      })
    },
  },
})
</script>

<style>
@import '../styles/DataGridVueDark.css';
</style>
