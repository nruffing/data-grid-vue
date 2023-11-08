import { DataType } from './DataGridVue'

/**
 * @description Grid-level sort options. The grid must be set as sortable for any
 *  column level sort options to take effect.
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
 * @description Whether a sort is ascending or descending.
 */
export enum SortType {
  ascending = 0,
  descending = 1,
}

/**
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
        return this.compareDate(new Date(aValue), new Date(bValue))
      case DataType.dateTime:
        return this.compareDateTime(new Date(aValue), new Date(bValue))
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
  compareDate(a: Date, b: Date) {
    const aJustDate = new Date(a.getFullYear(), a.getMonth(), a.getDate())
    const bJustDate = new Date(b.getFullYear(), b.getMonth(), b.getDate())
    return this.compareDateTime(aJustDate, bJustDate)
  },
  compareDateTime(a: Date, b: Date) {
    return a.getTime() - b.getTime()
  },
}
