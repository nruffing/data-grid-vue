# Class: ServerSideStorageService\<TUserId\>

## Description

The server-side [StorageService](../interfaces/StorageService.md) used when [DataGridVueGrid.serverSideStorageOptions](../DataGridVueGrid/index.md) is specified.
This storage service will only attempt to deserialize the response body for `getGridState`
if the HTTP status code is `200 OK` and the `Content-Type` response header is `application/json`.

## Type parameters

| Parameter |
| :------ |
| `TUserId` |

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md)\<`TUserId`\> | - |

## Constructors

### new ServerSideStorageService(options)

```ts
new ServerSideStorageService<TUserId>(options): ServerSideStorageService<TUserId>
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `options` | [`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md)\<`TUserId`\> |

#### Returns

[`ServerSideStorageService`](ServerSideStorageService.md)\<`TUserId`\>

## Methods

### getGridState()

```ts
getGridState(): Promise<undefined | GridState>
```

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

#### Implementation of

[`StorageService.getGridState`](../interfaces/StorageService.md#getgridstate)

#### Description

Retrieves the saved grid state. This is called once when the data grid component is mounted.

***

### setGridState()

```ts
setGridState(gridState): Promise<void>
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `gridState` | [`GridState`](../interfaces/GridState.md) | The grid state to save |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`void`\>

#### Implementation of

[`StorageService.setGridState`](../interfaces/StorageService.md#setgridstate)

#### Description

Saves a new version of the grid state. This called every time data in the grid state changes.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
