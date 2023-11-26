<template>
  <div
    class="dgv-header-cell"
    :key="column.field.fieldName"
    :class="{ sortable: sortable && column.sortable }"
    tabindex="0"
    :title="title"
    :aria-label="ariaLabel"
    @click.prevent="$emit('onClick', columnIndex)"
    @keydown.space="$emit('onClick', columnIndex)"
    @keydown.enter="$emit('onClick', columnIndex)"
    @keydown.left="$emit('onLeft', columnIndex)"
    @keydown.right="$emit('onRight', columnIndex)"
  >
    <div class="dgv-header-container">
      <span class="dgv-header-text">
        {{ formattedTitle }}
        <Icon
          v-if="sortable"
          :name="iconName"
          :text="iconText"
        />
      </span>
      <span class="dgv-drag-area"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Column } from '../DataGridVue'
import { type Sort, SortType } from '../Sort'
import Icon from './Icon.vue'
import Formatter from '../Formatter'

/**
 * @group Components
 * @description The header cell for each column.
 */
export default defineComponent({
  name: 'HeaderCell',
  components: {
    Icon,
  },
  props: {
    /**
     * @description The {@link Column} being rendered.
     */
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
    /**
     * @description Whether sorting is enabled at the grid-level.
     * @defaultValue false
     */
    sortable: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * @description The current sort for the entire data grid.
     */
    sort: {
      type: Object as PropType<Sort[]>,
      required: true,
    },
    /**
     * @description Whether to allow columns to be reordered using drag-and-drop
     * powered by {@link https://www.npmjs.com/package/dragon-drop-vue | drag-drop-vue}.
     */
    allowColumnReorder: {
      type: Boolean,
      required: true,
    },
    /**
     * @description The zero-based index of the column that defines the current column order.
     */
    columnIndex: {
      type: Number,
      required: true,
    },
    /**
     * @description The total number of columns in the grid.
     */
    totalColumnCount: {
      type: Number,
      required: true,
    },
  },
  emits: {
    /**
     * @group emits
     * @description Event emitted when the header cell is clicked.
     * This is also emitted when the space bar is pressed and the header cell is focused.
     * @param columnIndex The zero-based index of the column that defines the current column order.
     */
    onClick(columnIndex: number): boolean {
      return true
    },
    /**
     * @group emits
     * @description Event emitted when the left arrow key is pressed and the header cell is focused.
     * @param columnIndex The zero-based index of the column that defines the current column order.
     */
    onLeft(columnIndex: number): boolean {
      return true
    },
    /**
     * @group emits
     * @description Event emitted when the right arrow key is pressed and the header cell is focused.
     * @param columnIndex The zero-based index of the column that defines the current column order.
     */
    onRight(columnIndex: number): boolean {
      return true
    },
  },
  computed: {
    sortIndex(): number | undefined {
      const index = this.sort?.findIndex(s => s.fieldName === this.column.field.fieldName)
      return index === -1 ? undefined : index
    },
    currentSort(): Sort | undefined {
      return this.sort && this.sortIndex ? this.sort[this.sortIndex] : undefined
    },
    formattedTitle(): string {
      return Formatter.columnTitle(this.column)
    },
    title(): string {
      let title = this.formattedTitle

      if (this.sortable && !this.currentSort) {
        title += ' - Click to sort ascending'
      } else if (this.sortable && this.currentSort?.type === SortType.ascending) {
        title += ' - Click to sort descending'
      } else if (this.sortable && this.currentSort?.type === SortType.descending) {
        title += ' - Click to remove sort'
      }

      if (this.allowColumnReorder) {
        title += ' - Drag to reorder'
      }

      return title
    },
    ariaLabel(): string {
      let title = Formatter.ariaColumnLabel(this.column)

      if (this.sortable && !this.currentSort) {
        title += ', use space bar to sort ascending'
      } else if (this.sortable && this.currentSort) {
        title += this.currentSort.type === SortType.ascending ? ', currently sorted ascending' : ', currently sorted descending'
        if (this.sort.length > 1) {
          title += ` with a sort priority of ${this.sortIndex} among ${this.sort.length} sorted columns`
        }
        title += this.currentSort.type === SortType.ascending ? ', use space bar to sort descending' : ', use space bar to remove sort'
      }

      if (this.allowColumnReorder) {
        title += `, use left and right arrow keys to reorder, currently in position ${this.columnIndex + 1} of ${this.totalColumnCount} columns`
      }

      return title
    },
    iconName(): string {
      if (!this.currentSort) {
        return ''
      }

      if (this.currentSort.type === SortType.ascending) {
        return 'sort-ascending'
      }

      return 'sort-descending'
    },
    iconText(): string | undefined {
      if (!this.iconName || !this.sort || this.sort.length < 2) {
        return undefined
      }
      if (!this.sortIndex) {
        return undefined
      }
      return (this.sortIndex + 1).toString()
    },
  },
})
</script>
