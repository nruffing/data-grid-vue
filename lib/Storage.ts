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
  /** The field names of the hidden columns */
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
   * @returns A Promise that returns the saved grid state or undefined if no grid state is saved.
   */
  getGridStateAsync(): Promise<GridState | undefined>
  /**
   * @description Saves a new version of the grid state. This called every time data in the grid state changes.
   * @param gridState The grid state to save
   * @returns A Promise that returns when the grid state has been saved.
   */
  setGridStateAsync(gridState: GridState): Promise<void>
}

/**
 * @group Storage Service
 * @description A stub {@link StorageService} that will just return empty resolved promises.
 */
export const StubStorageService = {
  getGridStateAsync(): Promise<GridState | undefined> {
    return Promise.resolve(undefined)
  },
  setGridStateAsync(gridState: GridState): Promise<void> {
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

  getGridStateAsync(): Promise<GridState | undefined> {
    const rawValue = sessionStorage.getItem(this.key)
    let result = undefined as GridState | undefined
    if (rawValue) {
      result = JSON.parse(rawValue) as GridState
    }
    return Promise.resolve(result)
  }

  setGridStateAsync(gridState: GridState): Promise<void> {
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

  getGridStateAsync(): Promise<GridState | undefined> {
    const rawValue = localStorage.getItem(this.key)
    let result = undefined as GridState | undefined
    if (rawValue) {
      result = JSON.parse(rawValue) as GridState
    }
    return Promise.resolve(result)
  }

  setGridStateAsync(gridState: GridState): Promise<void> {
    localStorage.setItem(this.key, JSON.stringify(gridState))
    return Promise.resolve()
  }
}

/**
 * @group Storage Service
 * @description Request data interface sent by the {@link ServerSideStorageService} to get the current grid state.
 * @typeParam TUserId The type of the user identifier.
 */
export interface GetGridStateRequest<TUserId> {
  /** The unique identifier for the current user.  */
  userId: TUserId
}

/**
 * @group Storage Service
 * @description Request data interface sent by the {@link ServerSideStorageService} to save the current grid state.
 * @typeParam TUserId The type of the user identifier.
 */
export interface SetGridStateRequest<TUserId> {
  /** The unique identifier for the current user.  */
  userId: TUserId
  /** The current grid state to save. */
  gridState: GridState
}

/**
 * @group Storage Service
 * @description Callback type to change the {@link https://developer.mozilla.org/docs/Web/API/Request | Request}
 * object before it is sent to the server from the built-in server side storage service. This is useful
 * when you need to map the {@link GetGridStateRequest} to a different data contract or alter the HTTP verb/headers.
 * @typeParam TUserId The type of the user identifier.
 */
export type BeforeGetRequestHandler<TUserId> = (request: Request, body: GetGridStateRequest<TUserId>) => Promise<Request>

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
 * @typeParam TUserId The type of the user identifier.
 */
export type BeforeSetRequestHandler<TUserId> = (request: Request, body: SetGridStateRequest<TUserId>) => Promise<Request>

/**
 * @group Storage Service
 * @description Callback type to change the {@link https://developer.mozilla.org/docs/Web/API/Response | Response}
 * object before it is handled by the data grid from the built-in server side data service.
 */
export type SetResponseHandler = (response: Response) => Promise<boolean>

/**
 * @group Storage Service
 * @description Options to configure the built-in server-side storage service.
 * The server-side storage service will only attempt to deserialize the response body for `getGridState`
 * if the HTTP status code is `200 OK` and the `Content-Type` response header is `application/json`.
 * @typeParam TUserId The type of the user identifier.
 * @see {@link ServerSideStorageService}
 */
export interface ServerSideStorageServiceOptions<TUserId> {
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
  beforeGetRequest?: BeforeGetRequestHandler<TUserId>
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
  beforeSetRequest?: BeforeGetRequestHandler<TUserId>
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
 * @description The server-side {@link StorageService} used when {@link DataGridVueGrid.serverSideStorageOptions} is specified.
 * This storage service will only attempt to deserialize the response body for `getGridState`
 * if the HTTP status code is `200 OK` and the `Content-Type` response header is `application/json`.
 */
export class ServerSideStorageService<TUserId> implements StorageService {
  options: ServerSideStorageServiceOptions<TUserId>

  constructor(options: ServerSideStorageServiceOptions<TUserId>) {
    this.options = options
  }

  async getGridStateAsync(): Promise<GridState | undefined> {
    const body = {
      userId: this.options.userId,
    } as GetGridStateRequest<TUserId>

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

    if (response.status == 200 && response.headers.get('Content-Type')?.includes('application/json')) {
      return response.json()
    }

    return undefined
  }

  async setGridStateAsync(gridState: GridState): Promise<void> {
    const body = {
      userId: this.options.userId,
      gridState,
    } as SetGridStateRequest<TUserId>

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
  }
}
