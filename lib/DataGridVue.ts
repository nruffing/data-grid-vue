import type { FilterOperator } from './Filter'

export enum DataType {
  none = 0,
  alphanumeric = 1,
  number = 2,
  date = 3,
  dateTime = 4,
}

export interface Column {
  title?: string
  dataType: DataType
  field: Field
  isKey?: boolean
  sortable?: boolean
  filterable?: boolean
  filterOptions?: ColumnFilterOptions
  width?: string
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
