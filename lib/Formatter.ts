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
   * Gets the column's title. If the column does not have a title the
   * column's field name is converted to title case.
   * @param column The column to create title for.
   */
  columnTitle(column: Column) {
    return column.title ?? this.fromCamelCase(column.field.fieldName)
  },
  /**
   * Creates an ARIA label for the column.
   * @param column The column to create label for..
   */
  ariaColumnLabel(column: Column, prefix: string = '') {
    const title = this.columnTitle(column)
    return `${prefix} ${title ? title : 'The column does not have a title specified.'}`
  },
}
