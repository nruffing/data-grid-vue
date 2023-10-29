import Formatter from '../Formatter'
import type { Column } from '../DataGridVue'
import { computed } from 'vue'

export function useColumn(column: Column) {
  const formattedTitle = computed(() => {
    return column.title ?? Formatter.fromCamelCase(column.field.fieldName)
  })

  return { formattedTitle }
}
