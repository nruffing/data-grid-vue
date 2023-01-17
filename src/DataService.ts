import { type PageData, EmptyPageData } from "./DataGridVue"
import { type Sort, ClientSideSort } from "./Sort"

export interface DataService {
  getPage: (pageNum: number, pageSize: number, sort: Sort[]) => Promise<PageData>,
}

export const StubDataService = {
  getPage(pageNum: number, pageSize: number, sort: Sort[]): Promise<PageData> {
    return Promise.resolve(EmptyPageData)
  }
} as DataService

export class ClientSideDataService implements DataService {
  dataItems: any[]
  previousSort: Sort[]
  sorted: any[]

  constructor(dataItems: any[]) {
    this.dataItems = dataItems
    this.previousSort = []
    this.sorted = [...dataItems]
  }

  resetSort() {
    this.sorted = [...this.dataItems]
  }

  setPreviousSort(sort: Sort[]) {
    this.previousSort = []
    for (const sortColumn of sort) {
      this.previousSort.push({...sortColumn})
    }
  }

  sort(sort: Sort[]) {
    if (!sort?.length && !this.previousSort?.length) {
      return
    }

    if (!sort?.length && this.previousSort?.length) {
      this.resetSort()
      this.setPreviousSort(sort)
      return
    }

    let sortChanged = false
    if (sort.length === this.previousSort?.length) {
      for (var i = 0; i < sort.length; i++) {
        var sortItem = sort[i]
        var previousSortItem = this.previousSort[i]
        if (sortItem.fieldName !== previousSortItem.fieldName ||
          sortItem.type !== previousSortItem.type) {
            sortChanged = true
            break
        }
      }
    }
    else {
      sortChanged = true
    }

    if (!sortChanged) {
      return
    }

    ClientSideSort.sort(sort, this.sorted)
    this.setPreviousSort(sort)
  }

  getPage(pageNum: number, pageSize: number, sort: Sort[]): Promise<PageData> {
    if (pageNum <= 0 || pageSize <= 0) {
      console.error(`ClientSideDataRepository - getPage - invalid params - pageNum: ${pageNum}, pageSize: ${pageSize}`)
      return Promise.reject()
    }
    if (!this.dataItems.length) {
      return Promise.resolve(EmptyPageData)
    }

    this.sort(sort)

    const startIndex = pageSize * (pageNum - 1)
    const endIndex = startIndex + pageSize

    if (startIndex >= this.dataItems.length) {
      console.warn(`ClientSideDataRepository - getPage - pageNum exceeds data length`)
      return Promise.resolve(EmptyPageData)
    }

    return Promise.resolve({
      totalItems: this.dataItems.length,
      dataItems: this.sorted.slice(startIndex, endIndex),
    })
  }
}