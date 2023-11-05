<template>
  <div
    class="dgv-header-cell"
    :key="column.field.fieldName"
    :class="{ sortable: sortable && column.sortable }"
  >
    <div class="dgv-header-container">
      <span
        class="dgv-header-text"
        @click.prevent="$emit('onClick', column)"
      >
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

/** @group Components */
export default defineComponent({
  name: 'HeaderCell',
  props: {
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
    sortable: {
      type: Boolean,
      required: false,
      default: false,
    },
    sort: {
      type: Object as PropType<Sort[]>,
      required: false,
      default: undefined,
    },
  },
  computed: {
    formattedTitle(): string {
      return Formatter.columnTitle(this.column)
    },
    iconName(): string {
      const sort = this.sort?.find(s => s.fieldName === this.column.field.fieldName)
      if (!sort) {
        return ''
      }

      if (sort.type === SortType.ascending) {
        return 'sort-ascending'
      }

      return 'sort-descending'
    },
    iconText(): string | undefined {
      if (!this.iconName || !this.sort || this.sort.length < 2) {
        return undefined
      }
      const index = this.sort.findIndex(s => s.fieldName === this.column.field.fieldName)
      if (index === -1) {
        return undefined
      }
      return (index + 1).toString()
    },
  },
})
</script>
