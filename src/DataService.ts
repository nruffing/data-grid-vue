import { type PageData, EmptyPageData } from "./DataGridVue"
import { type Sort, ClientSideSort } from "./Sort"
import { type Filter, ClientSideFilter } from "./Filter"

export interface DataService {
  getPage: (pageNum: number, pageSize: number, sort: Sort[], filter: Filter | undefined) => Promise<PageData>,
}

export const StubDataService = {
  getPage(pageNum: number, pageSize: number, sort: Sort[], filter: Filter | undefined): Promise<PageData> {
    return Promise.resolve(EmptyPageData)
  }
} as DataService

export class ClientSideDataService implements DataService {
  dataItems: any[]
  previousSortJson: string
  sorted: any[]
  previousFilterJson: string
  filtered: any[]

  constructor(dataItems: any[]) {
    this.dataItems = dataItems
    this.previousSortJson = ''
    this.sorted = [...dataItems]
    this.previousFilterJson = ''
    this.filtered = [...this.sorted]
  }

  sort(sort: Sort[]) {
    if (!sort?.length && this.previousSortJson === '[]') {
      return
    }

    if (!sort?.length) {
      this.sorted = [...this.dataItems]
      this.previousSortJson = '[]'
    } else {
      const sortJson = JSON.stringify(sort)
      if (sortJson !== this.previousSortJson) {
        ClientSideSort.sort(sort, this.sorted)
        this.previousSortJson = sortJson
      }
    }

    this.filtered = [...this.sorted]
  }

  filter(filter: Filter | undefined) {
    if (!filter && !this.previousFilterJson) {
      return
    }

    if (!filter && this.previousFilterJson) {
      this.filtered = [...this.sorted]
      this.previousFilterJson = ''
      return
    }

    const filterJson = JSON.stringify(filter)
    if (filterJson === this.previousFilterJson) {
      return
    }

    this.filtered = ClientSideFilter.filter(filter as Filter, this.sorted)
    this.previousFilterJson = filterJson
  }

  getPage(pageNum: number, pageSize: number, sort: Sort[], filter: Filter | undefined): Promise<PageData> {
    if (pageNum <= 0 || pageSize <= 0) {
      console.error(`ClientSideDataRepository - getPage - invalid params - pageNum: ${pageNum}, pageSize: ${pageSize}`)
      return Promise.reject()
    }
    if (!this.dataItems.length) {
      return Promise.resolve(EmptyPageData)
    }

    this.sort(sort)
    this.filter(filter)

    const startIndex = pageSize * (pageNum - 1)
    const endIndex = startIndex + pageSize

    if (startIndex >= this.dataItems.length) {
      console.warn(`ClientSideDataRepository - getPage - pageNum exceeds data length`)
      return Promise.resolve(EmptyPageData)
    }

    return Promise.resolve({
      totalItems: this.dataItems.length,
      dataItems: this.filtered.slice(startIndex, endIndex),
    })
  }
}