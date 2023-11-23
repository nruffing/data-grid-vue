import { type PageData, EmptyPageData } from './DataGridVue'
import { type Sort, ClientSideSort } from './Sort'
import { type Filter, ClientSideFilter } from './Filter'

/**
 * @group Data Service
 * @description Interface to implement to define a data service to retrieve grid data.
 */
export interface DataService {
  /**
   * Called to get data for the currently rendered page.
   * @param pageNum The page number for the page to load starting with `1` for the first page.
   * If the data grid is not set configured to be pageable with the {@link DataGridVueGrid.paged}
   * prop then this will always be `-1`.
   * @param pageSize The maximum number of data items to display on each page. If the data grid is
   * not set configured to be pageable with the {@link DataGridVueGrid.paged} prop then this
   * will always be `-1`.
   * @param sort The current column sort definitions in the order in which they should be applied.
   * @param filter The current filter definition or undefined if no filter is set.
   * @returns A Promise that returns the {@link PageData} for the current page.
   */
  getPage: (pageNum: number, pageSize: number, sort: Sort[], filter: Filter | undefined) => Promise<PageData>
}

/**
 * @group Data Service
 * @description A stub {@link DataService} that will noop the getPage call and return an empty page data object.
 */
export const StubDataService = {
  getPage(pageNum: number, pageSize: number, sort: Sort[], filter: Filter | undefined): Promise<PageData> {
    return Promise.resolve(EmptyPageData)
  },
} as DataService

/**
 * @group Data Service
 * @description The client-side {@link DataService} used when {@link DataGridVueGrid.data} is specified.
 */
export class ClientSideDataService implements DataService {
  dataItems: any[]
  previousSortJson: string
  sorted: any[]
  previousFilterJson: string
  filtered: any[]

  constructor(dataItems: any[]) {
    this.dataItems = dataItems
    this.previousSortJson = ''
    this.filtered = [...dataItems]
    this.sorted = [...this.filtered]
    this.previousFilterJson = ''
  }

  sort(sort: Sort[]) {
    this.sorted = [...this.filtered]

    if (!sort?.length && this.previousSortJson === '[]') {
      return
    }

    if (!sort?.length) {
      this.previousSortJson = '[]'
    } else {
      const sortJson = JSON.stringify(sort)
      if (sortJson !== this.previousSortJson) {
        ClientSideSort.sort(sort, this.sorted)
        this.previousSortJson = sortJson
      }
    }
  }

  filter(filter: Filter | undefined) {
    if (!filter && !this.previousFilterJson) {
      return
    }

    if (!filter && this.previousFilterJson) {
      this.filtered = [...this.dataItems]
      this.previousFilterJson = ''
      return
    }

    const filterJson = JSON.stringify(filter)
    if (filterJson === this.previousFilterJson) {
      return
    }

    this.filtered = ClientSideFilter.filter(filter as Filter, this.dataItems)
    this.previousFilterJson = filterJson
  }

  getPage(pageNum: number, pageSize: number, sort: Sort[], filter: Filter | undefined): Promise<PageData> {
    if (!this.dataItems.length) {
      return Promise.resolve(EmptyPageData)
    }

    this.filter(filter)
    this.sort(sort)

    let paged = this.sorted
    if (pageNum > 0 && pageSize > 0) {
      const startIndex = pageSize * (pageNum - 1)
      const endIndex = startIndex + pageSize

      if (startIndex >= this.dataItems.length) {
        console.warn(`ClientSideDataRepository - getPage - pageNum exceeds data length`)
        return Promise.resolve(EmptyPageData)
      }

      paged = this.sorted.slice(startIndex, endIndex)
    }

    return Promise.resolve({
      totalItems: this.filtered.length,
      dataItems: paged,
    })
  }
}

/**
 * @group Data Service
 * @description Request data interface sent by the {@link ServerSideDataService}. This can be modified before
 * the HTTP request is sent using the {@link BeforeRequestHandler} callback on {@link ServerSideDataServiceOptions}.
 * @see {@link https://github.com/nruffing/data-grid-vue-dotnet/blob/main/DataGridVueDotnet/PageDataRequest.cs | dotnet model}
 */
export interface PageDataRequest {
  /**
   * @description The page number for the page to load starting with `1` for the first page.
   * If the data grid is not set configured to be pageable with the {@link DataGridVueGrid.paged}
   * prop then this will always be `-1`.
   */
  pageNum: number

  /**
   * @description The maximum number of data items to display on each page. If the data grid is
   * not set configured to be pageable with the {@link DataGridVueGrid.paged} prop then this
   * will always be `-1`.
   */
  pageSize: number

  /**
   * @description The current column sort definitions in the order in which they should be applied.
   */
  sort: Sort[]

  /**
   * @description The current filter definition or undefined if no filter is set.
   */
  filter: Filter | undefined
}

/**
 * @group Data Service
 * @description Callback type to change the {@link https://developer.mozilla.org/docs/Web/API/Request | Request}
 * object before it is sent to the server from the built-in server side data service. This is useful
 * when you need to map the {@link PageDataRequest} to a different data contract.
 * @see {@link https://www.nuget.org/packages/DataGridVueDotnet/0.0.1-alpha | dotnet IQueryable helpers}
 */
export type BeforeRequestHandler = (request: Request, body: PageDataRequest) => Promise<Request>

/**
 * @group Data Service
 * @description Callback type to change the {@link https://developer.mozilla.org/docs/Web/API/Response | Response}
 * object before it is handled by the data grid from the built-in server side data service.
 * This is useful when you need to map the servers response data back to {@link PageData}.
 * @see {@link https://www.nuget.org/packages/DataGridVueDotnet/0.0.1-alpha | dotnet IQueryable helpers}
 */
export type ResponseHandler = (response: Response) => Promise<PageData>

/**
 * @group Data Service
 * @description Options to configure the built-in server-side data service including the POST url and optional
 * callbacks to alter the data format of the request and response allowing. This allows the built-in data service
 * to handle the data contract of any server. The server-side data service will only attempt to deserialize the response
 * body if the HTTP status code is `200 OK` and the `Content-Type` response header is `application/json`.
 * @see {@link ServerSideDataService}
 * @see {@link https://www.nuget.org/packages/DataGridVueDotnet/0.0.1-alpha | dotnet IQueryable helpers}
 */
export interface ServerSideDataServiceOptions {
  /**
   * @description The full HTTP/HTTPS url to send the POST request.
   * Use {@link beforeRequest} callback to alter the HTTP verb or headers.
   */
  postRoute?: string | URL

  /**
   * Optional callback to change the {@link https://developer.mozilla.org/docs/Web/API/Request | Request}
   * object before it is sent to the server. This is useful when you need to map the {@link PageDataRequest}
   * to a different data contract.
   */
  beforeRequest?: BeforeRequestHandler

  /**
   * Optional callback to change the {@link https://developer.mozilla.org/docs/Web/API/Response | Response}
   * object before it is handled by the data grid. This is useful when you need to map the servers response
   * data back to {@link PageData}.
   */
  responseHandler?: ResponseHandler
}

/**
 * @group Data Service
 * @description The server-side {@link DataService} used when {@link DataGridVueGrid.serverSideOptions} is specified.
 * This data service will only attempt to deserialize the response body if the HTTP status code is `200 OK` and the
 * `Content-Type` response header is `application/json`.
 */
export class ServerSideDataService implements DataService {
  options: ServerSideDataServiceOptions

  constructor(options: ServerSideDataServiceOptions) {
    this.options = options
  }

  async getPage(pageNum: number, pageSize: number, sort: Sort[], filter: Filter | undefined): Promise<PageData> {
    const body = {
      pageNum,
      pageSize,
      sort,
      filter,
    } as PageDataRequest

    let request = new Request(this.options.postRoute ?? '', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(body),
    })

    if (this.options.beforeRequest) {
      request = await this.options.beforeRequest(request, body)
    }

    if (!request.url) {
      console.error(
        'A request url for the page data request has to be set either by supplying it directly or setting it as part of beforeRequest handler.',
      )
      return EmptyPageData
    }

    var response = await fetch(request)

    if (this.options.responseHandler) {
      return await this.options.responseHandler(response)
    }

    if (response.status >= 400) {
      console.error('Failed to retrieve page data', await response.text(), response)
      return EmptyPageData
    }

    if (response.status === 200 && response.headers.get('Content-Type')?.includes('application/json')) {
      return response.json()
    }

    return EmptyPageData
  }
}
