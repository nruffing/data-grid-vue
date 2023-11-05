import type { Column } from './DataGridVue'

export default {
  fromCamelCase(value: string): string {
    const withSpaces = value.replace(/[A-Z]/g, (s: string): string => {
      return ' ' + s
    })
    return withSpaces[0].toUpperCase() + withSpaces.substring(1)
  },
  columnTitle(column: Column) {
    return column.title ?? this.fromCamelCase(column.field.fieldName)
  },
}
