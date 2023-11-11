# Class: LocalStorageService

## Description

Storage service that saves grid state in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | - |

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

### getGridState()

```ts
getGridState(): Promise<undefined | GridState>
```

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

#### Implementation of

[`StorageService`](../interfaces/StorageService.md).[`getGridState`](../interfaces/StorageService.md#getgridstate)

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

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`void`\>

#### Implementation of

[`StorageService`](../interfaces/StorageService.md).[`setGridState`](../interfaces/StorageService.md#setgridstate)

#### Description

Saves a new version of the grid state. This called everytime data in the grid state changes.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
