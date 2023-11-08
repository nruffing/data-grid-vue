import type { FilterOperator } from './Filter'

/**
 * @description Supported data types for a column.
 */
export enum DataType {
  none = 0,
  alphanumeric = 1,
  number = 2,
  date = 3,
  dateTime = 4,
}

/**
 * @description Column definition
 */
export interface Column {
  /**
   * @description The value to display in the columns header. If not specified {@link Field.fieldName}
   * is converted to title casing and displayed as the columns header.
   */
  title?: string

  /**
   * @description The {@link DataType} for the column.
   */
  dataType: DataType

  /**
   * @description The data {@link Field} for the column. The {@link Field} describes how to get the column's value
   * from the row's data item.
   */
  field: Field

  /**
   * @description Whether to use this columns value as the key for the data item. It is highly recommended to set this
   * on a single column. If more then one column is set as the key column only the first one is used. If no columns are
   * set as the key column then the first column is used.
   */
  isKey?: boolean

  /**
   * @description Whether the column should be sortable. This value is ignored if {@link DataGridVueGrid.sortOptions} is
   * not set to turn on sorting for the grid. Setting this property to false will then not allow this specific column
   * to be sorted.
   */
  sortable?: boolean

  /**
   * @description Whether the column should be filterable. If {@link filterOptions} is not specified then the first
   * valid {@link FilterOperator} is used for the columns {@link DataType}. Valid filter operators are defined in
   * {@link ValidOperatorsMap}.
   */
  filterable?: boolean
  filterOptions?: ColumnFilterOptions
  width?: string
  hidden?: boolean
}

export interface ColumnFilterOptions {
  operators?: FilterOperator[]
}

export type FieldValueGetter = ((dataItem: any) => any) | undefined

export class Field {
  fieldName: string
  valueGetter?: FieldValueGetter

  constructor(fieldName: string, valueGetter: FieldValueGetter = undefined) {
    this.fieldName = fieldName
    this.valueGetter = valueGetter
  }

  resolveValue(dataItem: any): any {
    if (this.valueGetter) {
      return this.valueGetter(dataItem)
    }

    return dataItem[this.fieldName]
  }
}

export interface PageData {
  totalItems: number
  dataItems: any[]
}

export const EmptyPageData = {
  totalItems: 0,
  dataItems: [],
} as PageData
