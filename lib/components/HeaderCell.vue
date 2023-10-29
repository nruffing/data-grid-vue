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

<script lang="ts" setup>
import { defineProps, computed, type PropType } from 'vue'
import type { Column } from '../DataGridVue'
import { type Sort, SortType } from '../Sort'
import Icon from './Icon.vue'
import { useColumn } from '../composables/Column'

const props = defineProps({
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
})

const { formattedTitle } = useColumn(props.column)

const iconName = computed(() => {
  const sort = props.sort?.find(s => s.fieldName === props.column.field.fieldName)
  if (!sort) {
    return ''
  }

  if (sort.type === SortType.ascending) {
    return 'sort-ascending'
  }

  return 'sort-descending'
})

const iconText = computed(() => {
  if (!iconName || !props.sort || props.sort.length < 2) {
    return undefined
  }
  return (props.sort.findIndex(s => s.fieldName === props.column.field.fieldName) + 1).toString()
})
</script>
