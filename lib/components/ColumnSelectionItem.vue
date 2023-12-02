<template>
  <label
    class="dgv-toggle-container"
    :aria-label="ariaLabel"
  >
    <span class="dgv-toggle">
      <input
        type="checkbox"
        v-model="shown"
        :name="column.field.fieldName"
        autocomplete="off"
        @change="toggle"
      />
      <span class="dgv-toggle-slider"></span>
    </span>
    <span class="dgv-column-selection-label">{{ formattedTitle }}</span>
  </label>
</template>

<script lang="ts">
import { type PropType, defineComponent } from 'vue'
import type { Column } from '../DataGridVue'
import Formatter from '../Formatter'

interface Data {
  shown: boolean
}

/**
 * @group Components
 * @description Column toggle item displayed in the column selected menu.
 * @see {@link DataGridVueGrid.showColumnSelection}
 */
export default defineComponent({
  name: 'ColumnSelectionItem',
  props: {
    /**
     * @description The {@link Column} to show or hide.
     */
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
  },
  emits: {
    /**
     * @group emits
     * @description Event emitted when the shown/hidden state of the column has been updated.
     * @param hidden The new hidden state of the column.
     */
    'hidden-updated'(hidden: boolean): boolean {
      return true
    },
  },
  data(): Data {
    return {
      shown: false,
    }
  },
  mounted() {
    this.shown = !(this.column.hidden ?? false)
  },
  computed: {
    formattedTitle(): string {
      return Formatter.columnTitle(this.column)
    },
    ariaLabel(): string {
      return `${Formatter.ariaColumnLabel(this.column)} is currently ${this.shown ? 'shown' : 'hidden'}. Use space bar to ${
        this.shown ? 'hide' : 'show'
      } it.`
    },
  },
  methods: {
    toggle() {
      this.$emit('hidden-updated', !this.shown)
    },
  },
})
</script>
