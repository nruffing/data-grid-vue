# Class: ServerSideStorageService\<TUserId, TGridId\>

## Description

The server-side [StorageService](../interfaces/StorageService.md) used when [DataGridVueGrid.serverSideStorageOptions](../DataGridVueGrid/README.md) is specified.
This storage service will only attempt to deserialize the response body for `getGridState`
if the HTTP status code is `200 OK` and the `Content-Type` response header is `application/json`.

## Type parameters

| Type parameter | Description |
| :------ | :------ |
| `TUserId` | The type of the user identifier. |
| `TGridId` | The type of the grid identifier. |

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Properties

| Property | Type |
| :------ | :------ |
| `options` | [`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md)\<`TUserId`, `TGridId`\> |

## Constructors

### new ServerSideStorageService(options)

```ts
new ServerSideStorageService<TUserId, TGridId>(options): ServerSideStorageService<TUserId, TGridId>
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `options` | [`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md)\<`TUserId`, `TGridId`\> |

#### Returns

[`ServerSideStorageService`](ServerSideStorageService.md)\<`TUserId`, `TGridId`\>

## Methods

### getGridStateAsync()

```ts
getGridStateAsync(): Promise<undefined | GridState>
```

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

A Promise that returns the saved grid state or undefined if no grid state is saved.

#### Implementation of

[`StorageService.getGridStateAsync`](../interfaces/StorageService.md#getgridstateasync)

#### Description

Retrieves the saved grid state. This is called once when the data grid component is mounted.

***

### setGridStateAsync()

```ts
setGridStateAsync(gridState): Promise<void>
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `gridState` | [`GridState`](../interfaces/GridState.md) | The grid state to save |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`void`\>

A Promise that returns when the grid state has been saved.

#### Implementation of

[`StorageService.setGridStateAsync`](../interfaces/StorageService.md#setgridstateasync)

#### Description

Saves a new version of the grid state. This called every time data in the grid state changes.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
