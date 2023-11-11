import { type Sort } from './Sort'
import { type Filter, type FilterCondition } from './Filter'

/**
 * @group Storage Service
 * @description Whether grid state is stored in {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage | localStorage}
 * or {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage | sessionStorage}.
 * @see {@link DataGridVueGrid.localStorageType}
 * @see {@link DataGridVueGrid.storageKey}
 */
export enum LocalStorageType {
  sessionStorage = 0,
  localStorage = 1,
}

/**
 * @group Storage Service
 * @description The data that is saved as part of the grid state.
 */
export interface GridState {
  /** The current page size */
  pageSize: number
  /** The field names of the hiddne columns */
  hiddenFields: string[]
  /** The current sort definition */
  sort: Sort[]
  /** The current filter conditions */
  filters: FilterCondition[]
  /** The current external filter if applied */
  externalFilter: Filter | undefined
  /** The field name of the columns in the order they are currently displayed */
  columnOrder: string[]
}

/**
 * @group Storage Service
 * @description Interface to implement to define a storage service to save and load grid state.
 */
export interface StorageService {
  /**
   * @description Retrieves the saved grid state. This is called once when the data grid component is mounted.
   */
  getGridState(): Promise<GridState | undefined>
  /**
   * @description Saves a new version of the grid state. This called everytime data in the grid state changes.
   * @param gridState The grid state to save
   */
  setGridState(gridState: GridState): Promise<void>
}

/**
 * @group Storage Service
 * @description A stub {@link StorageService} that will just return empty resolved promises.
 */
export const StubStorageService = {
  getGridState(): Promise<GridState | undefined> {
    return Promise.resolve(undefined)
  },
  setGridState(gridState: GridState): Promise<void> {
    return Promise.resolve()
  },
} as StorageService

/**
 * @group Storage Service
 * @description Storage service that saves grid state in {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage | sessionStorage}.
 */
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

/**
 * @group Storage Service
 * @description Storage service that saves grid state in {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage | localStorage}.
 */
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

/**
 * @group Storage Service
 * @description Request data interface sent by the {@link ServerSideStorageService} to get the current grid state.
 */
export interface GetGridStateRequest {
  userId: string | number
}

/**
 * @group Storage Service
 * @description Request data interface sent by the {@link ServerSideStorageService} to save the current grid state.
 */
export interface SetGridStateRequest {
  userId: string | number
  gridState: GridState
}

/**
 * @group Storage Service
 * @description Callback type to change the {@link https://developer.mozilla.org/docs/Web/API/Request | Request}
 * object before it is sent to the server from the built-in server side storage service. This is useful
 * when you need to map the {@link GetGridStateRequest} to a different data contract or alter the HTTP verb/headers.
 */
export type BeforeGetRequestHandler = (request: Request, body: GetGridStateRequest) => Promise<Request>

/**
 * @group Storage Service
 * @description Callback type to change the {@link https://developer.mozilla.org/docs/Web/API/Response | Response}
 * object before it is handled by the data grid from the built-in server side storage service.
 * This is useful when you need to map the servers response data back to {@link GridState}.
 */
export type GetResponseHandler = (response: Response) => Promise<GridState>

/**
 * @group Storage Service
 * @description Callback type to change the {@link https://developer.mozilla.org/docs/Web/API/Request | Request}
 * object before it is sent to the server from the built-in server side storage service. This is useful
 * when you need to map the {@link SetGridStateRequest} to a different data contract or alter the HTTP verb/headers.
 */
export type BeforeSetRequestHandler = (request: Request, body: SetGridStateRequest) => Promise<Request>

/**
 * @group Storage Service
 * @description Callback type to change the {@link https://developer.mozilla.org/docs/Web/API/Response | Response}
 * object before it is handled by the data grid from the built-in server side data service.
 */
export type SetResponseHandler = (response: Response) => Promise<boolean>

/**
 * @group Storage Service
 * @description Options to configure the built-in server-side storage service.
 * @see {@link ServerSideStorageService}
 */
export interface ServerSideStorageServiceOptions {
  /**
   * The unique identifier for the current user that will be sent to the server with the get and set requests.
   */
  userId: string | number
  /**
   * @description The full HTTP/HTTPS url to send the POST request to retrieve grid state.
   * Use {@link beforeGetRequest} callback to alter the HTTP verb or headers.
   */
  getPostRoute?: string | URL
  /**
   * Optional callback to change the {@link https://developer.mozilla.org/docs/Web/API/Request | Request}
   * object before it is sent to the server from the built-in server side storage service. This is useful
   * when you need to map the {@link GetGridStateRequest} to a different data contract or alter the HTTP verb/headers.
   */
  beforeGetRequest?: BeforeGetRequestHandler
  /**
   * Optional callback to change the {@link https://developer.mozilla.org/docs/Web/API/Response | Response}
   * object before it is handled by the data grid. This is useful when you need to map the servers response
   * data back to {@link GridState}.
   */
  getResponseHandler?: GetResponseHandler
  /**
   * @description The full HTTP/HTTPS url to send the POST request to save grid state.
   * Use {@link beforeSetRequest} callback to alter the HTTP verb or headers.
   */
  setPostRoute?: string | URL
  /**
   * Optional callback to change the {@link https://developer.mozilla.org/docs/Web/API/Request | Request}
   * object before it is sent to the server from the built-in server side storage service. This is useful
   * when you need to map the {@link SetGridStateRequest} to a different data contract or alter the HTTP verb/headers.
   */
  beforeSetRequest?: BeforeGetRequestHandler
  /**
   * Optional callback type to change the {@link https://developer.mozilla.org/docs/Web/API/Response | Response}
   * object before it is handled by the data grid from the built-in server side data service.
   */
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

/**
 * @group Storage Service
 * The server-side {@link StorageService} used when {@link DataGridVueGrid.serverSideStorageOptions} is specified.
 */
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
