import { DataType } from './DataGridVue'
import { parseDate } from './DateUtils'

/**
 * @group Sort
 * @description Grid-level sort options. The grid must be set as sortable for any
 * column level sort options to take effect.
 */
export interface SortOptions {
  /**
   * @description Whether the grid should be sortable.
   */
  sortable: boolean

  /**
   * @description Whether more then one column can be sorted at once.
   */
  multiColumn: boolean
}

/**
 * @group Sort
 * @description Whether a sort is ascending or descending.
 */
export enum SortType {
  ascending = 0,
  descending = 1,
}

/**
 * @group Sort
 * @description Column sort definition.
 */
export interface Sort {
  /**
   * @description The {@link Column}.{@link Field.fieldName} that the data is being sorted by.
   */
  fieldName: string

  /**
   * @description The {@link Column.dataType} for the column being sorted.
   * @see {@link DataType}
   */
  dataType: DataType

  /**
   * @description The {@link SortType} for the sort (i.e. ascending or descending).
   */
  type: SortType
}

/**
 * @ignore
 * Sort implementation for client-side sorting (i.e. `ClientSideDataService`).
 */
export const ClientSideSort = {
  sort(sort: Sort[], dataItems: any[]) {
    if (!dataItems?.length) {
      return
    }

    dataItems.sort((a: any, b: any): number => {
      for (const sortField of sort) {
        const compare = this.sortField(sortField, a, b)
        if (compare !== 0) {
          return sortField.type === SortType.descending ? compare * -1 : compare
        }
      }
      return 0
    })
  },
  sortField(sort: Sort, a: any, b: any): number {
    const aValue = a[sort.fieldName]
    const bValue = b[sort.fieldName]

    switch (sort.dataType) {
      case DataType.alphanumeric:
        return this.compareAlphanumeric(aValue as string, bValue as string)
      case DataType.number:
        return this.compareNumeric(aValue as number, bValue as number)
      case DataType.date:
        return this.compareDateTime(parseDate(aValue, true), parseDate(bValue, true))
      case DataType.dateTime:
        return this.compareDateTime(parseDate(aValue, false), parseDate(bValue, false))
    }

    console.warn(`Unknown data type detected while sorting: ${DataType[sort.dataType]}`)
    return 0
  },
  compareAlphanumeric(a: string, b: string): number {
    if (a === b) {
      return 0
    }
    if (a < b) {
      return -1
    }
    return 1
  },
  compareNumeric(a: number, b: number) {
    return a - b
  },
  compareDateTime(a: Date, b: Date) {
    return a.getTime() - b.getTime()
  },
}
