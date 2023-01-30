<template>
  <td
    :key="column.field.fieldName"
    :class="{ sortable }"
    @click.prevent="$emit('onClick', column)"
  >
    {{ formattedTitle }}
    <Icon 
      v-if="sortable" 
      :name="iconName" 
      :text="iconText"
    />
  </td>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Column } from '@/DataGridVue'
import { type Sort, SortType } from '@/Sort'
import Formatter from '@/Formatter'
import Icon from './Icon.vue'

export default defineComponent({
  name: 'HeaderCell',
  components: {
    Icon,
  },
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
      return this.column.title ?? Formatter.fromCamelCase(this.column.field.fieldName)
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
      return (this.sort.findIndex(s => s.fieldName === this.column.field.fieldName) + 1).toString()
    },
  },
})
</script>