# Class: LocalStorageService

## Description

Storage service that saves grid state in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Properties

| Property | Type |
| :------ | :------ |
| `key` | `string` |

## Constructors

### new LocalStorageService(key)

```ts
new LocalStorageService(key): LocalStorageService
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`LocalStorageService`](LocalStorageService.md)

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
