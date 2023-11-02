import { type Sort } from './Sort'
import { type Filter, type FilterCondition } from './Filter'

export enum LocalStorageType {
  sessionStorage = 0,
  localStorage = 1,
}

export interface GridState {
  pageSize: number
  hiddenFields: string[]
  sort: Sort[]
  filters: FilterCondition[]
  externalFilter: Filter | undefined
  columnOrder: string[]
}

export interface StorageService {
  getGridState(): Promise<GridState | undefined>
  setGridState(gridState: GridState): Promise<void>
}

export const StubStorageService = {
  getGridState(): Promise<GridState | undefined> {
    return Promise.resolve(undefined)
  },
  setGridState(gridState: GridState): Promise<void> {
    return Promise.resolve()
  },
} as StorageService

export class SessionStorageService implements StorageService {
  key: string

  constructor(key: string) {
    this.key = key
  }

  getGridState(): Promise<GridState | undefined> {
    const rawValue = sessionStorage.getItem(this.key)
    let result = undefined as GridState | undefined
    if (rawValue) {
      result = JSON.parse(rawValue) as GridState
    }
    return Promise.resolve(result)
  }

  setGridState(gridState: GridState): Promise<void> {
    sessionStorage.setItem(this.key, JSON.stringify(gridState))
    return Promise.resolve()
  }
}

export class LocalStorageService implements StorageService {
  key: string

  constructor(key: string) {
    this.key = key
  }

  getGridState(): Promise<GridState | undefined> {
    const rawValue = localStorage.getItem(this.key)
    let result = undefined as GridState | undefined
    if (rawValue) {
      result = JSON.parse(rawValue) as GridState
    }
    return Promise.resolve(result)
  }

  setGridState(gridState: GridState): Promise<void> {
    localStorage.setItem(this.key, JSON.stringify(gridState))
    return Promise.resolve()
  }
}

export interface GetGridStateRequest {
  userId: string | number
}

export interface SetGridStateRequest {
  userId: string | number
  gridState: GridState
}

export type BeforeGetRequestHandler = (request: Request, body: GetGridStateRequest) => Promise<Request>
export type GetResponseHandler = (response: Response) => Promise<GridState>
export type BeforeSetRequestHandler = (request: Request, body: SetGridStateRequest) => Promise<Request>
export type SetResponseHandler = (response: Response) => Promise<boolean>

export interface ServerSideStorageServiceOptions {
  userId: string | number
  getPostRoute?: string | URL
  beforeGetRequest?: BeforeGetRequestHandler
  getResponseHandler?: GetResponseHandler
  setPostRoute?: string | URL
  beforeSetRequest?: BeforeGetRequestHandler
  setResponseHandler?: GetResponseHandler
}

function getDefaultRequestOptions(): RequestInit {
  return {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    mode: 'cors',
    cache: 'no-cache',
  }
}

export class ServerSideStorageService implements StorageService {
  options: ServerSideStorageServiceOptions

  constructor(options: ServerSideStorageServiceOptions) {
    this.options = options
  }

  async getGridState(): Promise<GridState | undefined> {
    const body = {
      userId: this.options.userId,
    } as GetGridStateRequest

    let request = new Request(this.options.getPostRoute ?? '', {
      ...getDefaultRequestOptions(),
      body: JSON.stringify(body),
    })

    if (this.options.beforeGetRequest) {
      request = await this.options.beforeGetRequest(request, body)
    }

    if (!request.url) {
      console.error(
        'A request url for the get grid state request has to be set either by supplying it directly or setting it as part of beforeRequest handler.',
      )
      return undefined
    }

    var response = await fetch(request)

    if (this.options.getResponseHandler) {
      return await this.options.getResponseHandler(response)
    }

    if (response.status >= 400) {
      console.error('Failed to retrieve grid state', await response.text(), response)
      return undefined
    }
    return response.json()
  }

  async setGridState(gridState: GridState): Promise<void> {
    const body = {
      userId: this.options.userId,
      gridState,
    } as SetGridStateRequest

    let request = new Request(this.options.setPostRoute ?? '', {
      ...getDefaultRequestOptions(),
      body: JSON.stringify(body),
    })

    if (this.options.beforeSetRequest) {
      request = await this.options.beforeSetRequest(request, body)
    }

    if (!request.url) {
      console.error(
        'A request url for the set grid state request has to be set either by supplying it directly or setting it as part of beforeRequest handler.',
      )
      return undefined
    }

    var response = await fetch(request)

    if (this.options.setResponseHandler) {
      await this.options.setResponseHandler(response)
      return
    }

    if (response.status >= 400) {
      console.error('Failed to set grid state', await response.text(), response)
      return undefined
    }
    return response.json()
  }
}
