export interface DataService {
  getPage: (pageNum: number, pageSize: number) => Promise<any[]>,
}

export const StubDataService = {
  getPage(pageNum: number, pageSize: number): Promise<any[]> {
    return Promise.resolve([])
  }
} as DataService

export class ClientSideDataService implements DataService {
  dataItems: any[]
  
  constructor(dataItems: any[]) {
    this.dataItems = dataItems
  }

  getPage(pageNum: number, pageSize: number): Promise<any[]> {
    if (pageNum <= 0 || pageSize <= 0) {
      console.error(`ClientSideDataRepository - getPage - invalid params - pageNum: ${pageNum}, pageSize: ${pageSize}`)
      return Promise.reject()
    }
    if (!this.dataItems.length) {
      return Promise.resolve([])
    }

    const startIndex = pageSize * (pageNum - 1)
    const endIndex = startIndex + pageSize

    if (startIndex >= this.dataItems.length) {
      console.warn(`ClientSideDataRepository - getPage - pageNum exceeds data length`)
      return Promise.resolve([])
    }

    return Promise.resolve(this.dataItems.splice(startIndex, endIndex))
  }
}