import type { Column } from './DataGridVue'

/**
 * @group Utilities
 */
export default {
  /**
   * Converts camel-cased field name to be title-cased.
   * For example, firstName -> First Name
   * @param value The value to convert.
   */
  fromCamelCase(value: string): string {
    const withSpaces = value.replace(/[A-Z]/g, (s: string): string => {
      return ' ' + s
    })
    return withSpaces[0].toUpperCase() + withSpaces.substring(1)
  },
  /**
   * Converts column's field name to a column title.
   * @param column The column to create title for.
   */
  columnTitle(column: Column) {
    return column.title ?? this.fromCamelCase(column.field.fieldName)
  },
}
