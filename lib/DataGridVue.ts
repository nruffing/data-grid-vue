import type { FilterOperator } from './Filter'

/**
 * @group Column
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
 * @group Column
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
  /**
   * @description Additional options for how the column's filter behaves including the {@link FilterOperator}s to
   * allow the user to select from. Valid filter operators are defined in {@link ValidOperatorsMap}.
   */
  filterOptions?: ColumnFilterOptions
  /**
   * @description Optionally specifiy an absolute or relative column width. Column widths can be specified with px, % or *.
   * By default columns without a width specified will take up an equal share of the remaining space.
   * The relative * unit can be used to specify a column to take a relational share of the remaining space.
   * Column widths automatically regenerate when the window/page size changes.
   */
  width?: string

  /**
   * @description Whether the column is currently hidden.
   */
  hidden?: boolean
}

/**
 * @group Column
 * @description Additional options for how the column's filter behaves.
 */
export interface ColumnFilterOptions {
  /**
   * @description The {@link FilterOperator}s to allow the user to select from. Valid filter operators are
   * defined in {@link ValidOperatorsMap}.
   */
  operators?: FilterOperator[]
}

/**
 * @group Column
 * @description Type for optional callback function to map how to retrieve and/or format the columns
 * value from the data item. Using this callback will include any data modifications or formatting
 * in sorting and filtering. Similar mapping and formatting could be done with the
 * cell template slot (i.e. cell-${column.field.fieldName}) but those changes will not
 * be included in any sorting or filtering.
 */
export type FieldValueGetter = ((dataItem: any) => any) | undefined

/**
 * @group Column
 * @description Field definition for the field on the data item's type. The main purpose is to map
 * that field to a {@link Column}.
 */
export class Field {
  /**
   * The name of the field. This should be unique across all fields on the data grid.
   * If {@link valueGetter} is not specified the field name is also assumed to be the property
   * name of the desired value on the data item and is used to retrieve the value from the
   * data item using a direct string index.
   */
  fieldName: string

  /**
   * An optional callback function to map how to retrieve and/or format the columns
   * value from the data item. Using this callback will include any data modifications or formatting
   * in sorting and filtering. Similar mapping and formatting could be done with the
   * cell template slot (i.e. cell-${column.field.fieldName}) but those changes will not
   * be included in any sorting or filtering.
   */
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

/**
 * @group Data Service
 * @description Model definition for the data displaying on the current page.
 */
export interface PageData {
  /** The total number of data items after current filters are applied across all pages. */
  totalItems: number
  /** The data items for the current page. */
  dataItems: any[]
}

/**
 * @ignore
 */
export const EmptyPageData = {
  totalItems: 0,
  dataItems: [],
} as PageData
