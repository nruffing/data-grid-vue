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
        :clearFilters="clearFilters"
        :filter="filter"
        :filterOptionsShown="filterOptionsShown"
        :filterSummary="filterSummary"
        :clearSort="clearSort"
        :sort="sort"
      >
        <slot
          name="options-header-filter-options-shown"
          :toggleFilterOptionsShown="toggleFilterOptionsShown"
          :filterOptionsShown="filterOptionsShown"
        >
          <span
            v-if="filterable"
            class="dgv-action-text"
            tabindex="0"
            @click="toggleFilterOptionsShown"
            @keydown.space="toggleFilterOptionsShown"
            @keydown.enter="toggleFilterOptionsShown"
            :aria-label="`Filter options are currently ${filterOptionsShown ? 'shown' : 'hidden'}, use space bar to toggle visibility.`"
            role="checkbox"
            :aria-checked="filterOptionsShown"
          >
            <Icon name="filter" />
            <span>{{ filterOptionsShown ? 'Hide' : 'Show' }} Filter Options</span>
          </span>
        </slot>
        <slot
          name="options-header-clear-filters"
          :clearFilters="clearFilters"
          :filter="filter"
          :filterSummary="filterSummary"
          :clearSort="clearSort"
          :sort="sort"
        >
          <span
            v-if="filterable"
            class="dgv-action-text"
            tabindex="0"
            @click="clearFilters"
            @keydown.space="clearFilters"
            @keydown.enter="clearFilters"
            :aria-label="
              filterSummary ? `Clear all filters. Currently filtering by ${filterSummary}` : `Clear all filters. No filters currently applied.`
            "
            role="button"
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
            @keydown.space="toggleColumnSelectionShown($event)"
            @keydown.enter="toggleColumnSelectionShown($event)"
            aria-label="Open the add/remove columns menu."
            role="checkbox"
            :aria-checked="!!popupOptions"
          >
            <Icon name="add-column" />
            <span>Add/Remove Columns</span>
          </span>
        </slot>
      </slot>
    </div>

    <!-- HEADER CELLS -->
    <HeaderCell
      v-for="(column, index) in displayedColumns"
      :key="column.field.fieldName"
      :column="column"
      :sortable="sortOptions?.sortable"
      :sort="sort"
      :allow-column-reorder="allowColumnReorder"
      :column-index="index"
      :total-column-count="displayedColumns.length"
      @onClick="sortColumn"
      @onLeft="moveColumnLeft"
      @onRight="moveColumnRight"
      v-dgv-drag="allowColumnReorder ? { dragData: column, dropEffect: 'move', onDragStart } : false"
      v-dgv-drop="allowColumnReorder ? { dragData: column, dropEffect: 'move', onDragEnter, onDrop } : false"
      v-dgv-focus="{
        focusOnUpdate: focusedColumnFieldName === column.field.fieldName,
        onFocus: () => (focusedColumnFieldName = column.field.fieldName),
        onBlur: () => (focusedColumnFieldName = undefined),
      }"
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
    <Transition name="dgv-delay-in">
      <slot name="loader">
        <Loader
          v-if="isLoading"
          :style="{
            gridColumnEnd: cssColumnSpanValue,
            gridTemplateColumns: gridTemplateColumns,
            gridTemplateRows: gridBodyTemplateRows,
          }"
        />
      </slot>
    </Transition>
    <!-- 
      Scrollable region must have keyboard access.
      https://dequeuniversity.com/rules/axe/4.8/scrollable-region-focusable?application=AxeChrome
    -->
    <div
      class="dgv-data-grid-body"
      v-show="!isLoading"
      :style="{
        gridColumnEnd: cssColumnSpanValue,
        gridTemplateColumns: gridTemplateColumns,
        gridTemplateRows: gridBodyTemplateRows,
      }"
      tabindex="0"
      :aria-label="`Data grid content, currently displaying page ${currentPage} with ${displayedData.length} of ${totalItems} total items.`"
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
      <slot
        name="footer"
        :paged="paged"
        :currentPage="currentPage"
        :pageSize="pageSize"
        :totalItems="totalItems"
        :onCurrentPageChangedAsync="onCurrentPageChangedAsync"
        :onPageSizeChangedAsync="onPageSizeChangedAsync"
      >
        <PageNavigation
          v-if="paged"
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total-items="totalItems"
          @update:current-page="onCurrentPageChangedAsync"
        />
        <slot
          name="footer-page-size-select"
          :pageSize="pageSize"
          :pageSizes="pageSizes"
          :onPageSizeChangedAsync="onPageSizeChangedAsync"
        >
          <select
            v-if="paged && pageSizes?.length > 1"
            v-model="pageSize"
            name="dgv-page-size-select"
            @change="async () => await onPageSizeChangedAsync()"
            aria-label="Select page size"
          >
            <option
              v-for="pageSize in pageSizes"
              :value="pageSize"
            >
              {{ pageSize }}
            </option>
          </select>
        </slot>
        <slot name="footer-additional-content" />
        <slot
          name="footer-total-items"
          :totalItems="totalItems"
        >
          <span class="dgv-total-items">{{ totalItems }} items</span>
        </slot>
      </slot>
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
          :onHiddenUpdated="onHiddenUpdated"
        >
          <ColumnSelectionItem
            v-for="(column, index) in columns"
            :key="column.field.fieldName"
            :column="column"
            @hidden-updated="onHiddenUpdated(column, $event)"
            v-dgv-focus="{ focusOnMount: index === 0 }"
          />
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, nextTick, type SlotsType } from 'vue'
import { useNativeEvent, type NativeEvent, DebounceMode } from 'native-event-vue'
import { DataType, Field, type Column } from '../DataGridVue'
import { type DataService, StubDataService, ClientSideDataService, type ServerSideDataServiceOptions, ServerSideDataService } from '../DataService'
import { type Sort, type SortOptions, SortType } from '../Sort'
import { type Filter, type FilterCondition, CompileFilterSummary } from '../Filter'
import { calculateColumnWidths } from '../ColumnWidth'
import HeaderCell from './HeaderCell.vue'
import HeaderFilter from './HeaderFilter.vue'
import PageNavigation from './PageNavigation.vue'
import Icon from './Icon.vue'
import ColumnSelectionItem from './ColumnSelectionItem.vue'
import Loader from './Loader.vue'
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
  windowResizeDebounce: NativeEvent | undefined
  columnWidths: string[]
  draggingColumn: Column | undefined
  popupOptions:
    | {
        top: string
        right: string
      }
    | undefined
  storageService: StorageService
  focusedColumnFieldName: string | undefined
  isLoading: boolean
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
    Loader,
  },
  slots: Object as SlotsType<{
    /**
     * @description Slot to override the filter for the specified column. For example, the slot name `filter-id` would override the filter for the column with a field with the name `id`.
     */
    'filter-${column.field.fieldName}': (props: {
      /** The current {@link Column}. */
      column: Column
      /** The current {@link FilterCondition} applied to the column. */
      initialFilterCondition: FilterCondition
      /** Function to call when the filter condition has been updated to trigger the grid state to update. The function has a {@link FilterCondition} parameter to pass the new condition. */
      onFilterUpdated: (condition: FilterCondition) => void
    }) => any

    /**
     * @description Slot to override the cell for the specified column. For example, the slot name `cell-id` would override the cell for the column with a field with the name `id`.
     * Any data modifications or formatting done as part of the cell template will not be taken into account for filtering and sorting. If the desired behavior is to also sort and filter
     * based on the formatted value use {@link Field.valueGetter} instead.
     */
    'cell-${column.field.fieldName}': (props: {
      /** The entire data item for the current row. */
      dataItem: any
    }) => any

    /**
     * @description Slot to override what is rendered in the options header above the data grid.
     */
    'options-header'?: (props: {
      /** Function to call to toggle whether to display the filter row below the data grid's header. */
      toggleFilterOptionsShown: () => void
      /**
       * Function to call to toggle whether to display the column selection menu.
       * The function has a single Event parameter which is the click  or key event that triggered the toggle.
       */
      toggleColumnSelectionShown: (event: Event) => void
      /** Function to call to clear all current filter state. */
      clearFilters: () => void
      /** The current filter state */
      filter: Filter | undefined
      /** Whether or not the filter row is currently displayed. */
      filterOptionsShown: boolean
      /** A string summary of the current filters applied to the data grid. */
      filterSummary: string
      /** Function to call to clear all current sort state. */
      clearSort: () => void
      /** The current sort state */
      sort: Sort[]
    }) => any

    /**
     * @description Slot to override just the toggle column filters area of the options header above the grid.
     */
    'options-header-filter-options-shown'?: (props: {
      /** Function to call to toggle whether to display the filter row below the data grid's header. */
      toggleFilterOptionsShown: () => void
      /** Whether or not the filter row is currently displayed. */
      filterOptionsShown: boolean
    }) => any

    /**
     * @description Slot to override just the clear filters area of the options header above the grid.
     */
    'options-header-clear-filters'?: (props: {
      /** Function to call to clear all current filter state. */
      clearFilters: () => void
      /** The current filter state */
      filter: Filter | undefined
      /** A string summary of the current filters applied to the data grid. */
      filterSummary: string
      /** Function to call to clear all current sort state. */
      clearSort: () => void
      /** The current sort state */
      sort: Sort[]
    }) => any

    /**
     * @description Slot to override just the add/remove columns area of the options header above the grid.
     */
    'options-header-column-selection-shown'?: (props: {
      /**
       * Function to call to toggle whether to display the column selection menu.
       * The function has a single Event parameter which is the click  or key event that triggered the toggle.
       */
      toggleColumnSelectionShown: (event: Event) => void
    }) => any

    /**
     * @description Slot to override what is rendered in the add/remove columns menu.
     */
    'column-selection-popup'?: (props: {
      /** All current column state. */
      columns: Column[]
      /**
       * Function to call when the hidden state of a column should be changed. The function has a {@link Column} parameter and a boolean hidden parameter.
       */
      onHiddenUpdated: (column: Column, hidden: boolean) => void
    }) => any

    /**
     * @description Slot to override the entire footer of the data grid.
     */
    footer?: (props: {
      /** Whether the grid is paged. */
      paged: boolean
      /** The current page number starting with `1` for the first page. */
      currentPage: number
      /** The current page size. */
      pageSize: number
      /** The total number of items in the grid after all filter conditions have been applied. */
      totalItems: number
      /** Function to call when the current page changes. Promise resolves when the new page data is loaded. */
      onCurrentPageChangedAsync: (page: number) => Promise<void>
      /** Function to call when the page size has changed. Promise resolves when the new page data is loaded. */
      onPageSizeChangedAsync: (pageSize: number) => Promise<void>
    }) => any

    /**
     * @description Slot to override the page size select in the footer of the data grid.
     */
    'footer-page-size-select'?: (props: {
      /** The current page size. */
      pageSize: number
      /** The page sizes to allow the user to select between. */
      pageSizes: number[]
      /** Function to call when the page size has changed. Promise resolves when the new page data is loaded. */
      onPageSizeChangedAsync: (pageSize: number) => Promise<void>
    }) => any

    /**
     * @description Slot to add custom content to the footer of the data grid. The content is rendered after the page size select.
     */
    'footer-additional-content'?: (props: {}) => any

    /**
     * @description Slot to override the total items in the footer of the data grid.
     */
    'footer-total-items'?: (props: {
      /** The total number of items in the grid after all filter conditions have been applied. */
      totalItems: number
    }) => any

    /**
     * @description Slot to override the loader that is displayed when the data grid is loading page data.
     */
    loader?: (props: {}) => any
  }>,
  emits: {
    /**
     * @group emits
     * @description Event emitted when {@link Column} state is updated. This includes the column's hidden state and column order.
     * {@link Column} objects will not be mutated but a new array will be emitted with this event and that needs to trigger
     * the columns prop to update. Leveraging `v-model:columns` is recommended.
     * @param columns A clone of the new column state.
     */
    'update:columns'(columns: Column[]): boolean {
      return true
    },
  },
  props: {
    /**
     * @description Array of objects to display in the data grid when using the built-in {@link ClientSideDataService}.
     * This prop is required unless serverSideOptions or customDataService is supplied. The order of precedence
     * is {@link customDataService}, {@link serverSideOptions}, and then {@link data}.
     * The data grid will not react and rerender when this property changes. If that functionality is needed it is recommended
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
      type: Object as PropType<ServerSideStorageServiceOptions<any, any>>,
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
      focusedColumnFieldName: undefined,
      isLoading: false,
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
    filterSummary(): string {
      return CompileFilterSummary(this.filter)
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

    const gridState = await this.storageService.getGridStateAsync()
    if (gridState) {
      this.setGridState(gridState)
    }

    await this.loadPageDataAsync()

    this.windowResizeDebounce = useNativeEvent(window, 'resize', this.onWindowResize, undefined, 200, DebounceMode.MaximumFrequency)

    nextTick(() => {
      this.calculateColumnWidths()
    })
  },
  beforeUnmount() {
    this.windowResizeDebounce?.destroy()
    this.windowResizeDebounce = undefined
  },
  watch: {
    columns() {
      nextTick(() => {
        this.calculateColumnWidths()
      })
    },
  },
  methods: {
    async loadPageDataAsync(): Promise<void> {
      this.isLoading = true
      try {
        const pageData = await this.dataService.getPageAsync(
          this.paged ? this.currentPage : -1,
          this.paged ? this.pageSize : -1,
          this.sort,
          this.filter,
        )
        this.displayedData = pageData.dataItems
        this.totalItems = pageData.totalItems
      } finally {
        this.isLoading = false
      }
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
    sortColumn(columnIndex: number) {
      const column = this.displayedColumns[columnIndex]

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

      this.loadPageDataAsync()
      this.saveGridState()
    },
    onCurrentPageChangedAsync(page: number): Promise<void> {
      this.currentPage = page
      return this.loadPageDataAsync()
    },
    /**
     * @description Function to call when the page size has changed.
     * @param pageSize The new page size. If not specified the assumptions is the page size
     * has already been updated via a v-model binding.
     * @returns A promise that resolves when the page data has been loaded.
     */
    async onPageSizeChangedAsync(pageSize: number | undefined = undefined): Promise<void> {
      if (pageSize) {
        this.pageSize = pageSize
      }
      const numPages = Math.ceil(this.totalItems / this.pageSize)
      if (this.currentPage > numPages) {
        this.currentPage = numPages
      }
      await this.loadPageDataAsync()
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
        this.loadPageDataAsync()
        this.saveGridState()
      }
    },
    clearSort() {
      if (this.sort.length) {
        this.sort = []
        this.loadPageDataAsync()
        this.saveGridState()
      }
    },
    toggleColumnSelectionShown(event: Event) {
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
      this.loadPageDataAsync()
      this.saveGridState()
    },
    setFilter(filter: Filter | undefined) {
      this.externalFilter = filter
      this.loadPageDataAsync()
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
    onDragEnter(domEl: HTMLElement, dragEvent: DragEvent, dragOptions: DragonDropVueDragOptions<Column>, options: DragonDropVueOptions): boolean {
      // do not allow dropping column onto itself
      return this.draggingColumn?.field.fieldName !== dragOptions.dragData?.field.fieldName
    },
    onDrop(
      domEl: HTMLElement,
      dragEvent: DragEvent,
      dragOptions: DragonDropVueDragOptions<Column>,
      options: DragonDropVueOptions,
    ): boolean | undefined {
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

      this.onColumnReorder(newColumnOrder)
    },
    moveColumnLeft(columnIndex: number) {
      if (!this.allowColumnReorder || columnIndex <= 0) {
        return
      }
      this.shiftColumn(columnIndex, true)
    },
    moveColumnRight(columnIndex: number) {
      if (!this.allowColumnReorder || columnIndex >= this.displayedColumns.length - 1) {
        return
      }
      this.shiftColumn(columnIndex, false)
    },
    shiftColumn(index: number, reverse: boolean) {
      const columnIndex = reverse ? this.displayedColumns.length - index - 1 : index
      const oldColumnOrder = reverse ? [...this.columns].reverse() : [...this.columns]
      const newColumnOrder = [] as Column[]

      for (var i = 0, displayedIndex = 0; i < oldColumnOrder.length; i++) {
        const column = oldColumnOrder[i]
        if (column.hidden) {
          newColumnOrder.push(column)
          continue
        }
        if (displayedIndex === columnIndex) {
          newColumnOrder.push(oldColumnOrder[i + 1])
          newColumnOrder.push(column)
          i++
        } else {
          newColumnOrder.push(column)
        }
        displayedIndex++
      }

      if (reverse) {
        newColumnOrder.reverse()
      }
      this.onColumnReorder(newColumnOrder)
    },
    onColumnReorder(newColumnOrder: Column[]) {
      this.$emit('update:columns', newColumnOrder)
      this.saveGridState()
    },
    onHiddenUpdated(column: Column, hidden: boolean) {
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
        this.storageService.setGridStateAsync(this.gridState)
      })
    },
  },
})
</script>

<style>
@import '../styles/DataGridVueDark.css';
</style>
