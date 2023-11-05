<template>
  <label class="dgv-toggle-container">
    <span class="dgv-toggle">
      <input
        type="checkbox"
        v-model="shown"
        :name="column.field.fieldName"
        autocomplete="off"
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

/**@group Components */
export default defineComponent({
  name: 'ColumnSelectionItem',
  props: {
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
  },
  computed: {
    shown(): boolean {
      return this.column.hidden ?? false
    },
    formattedTitle(): string {
      return Formatter.columnTitle(this.column)
    },
  },
  watch: {
    shown(newValue: boolean) {
      this.$emit('hidden-updated', !newValue)
    },
  },
})
</script>
