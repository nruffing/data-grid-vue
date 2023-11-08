# Class: ServerSideStorageService

## Contents

- [Implements](ServerSideStorageService.md#implements)
- [Constructors](ServerSideStorageService.md#constructors)
  - [new ServerSideStorageService(options)](ServerSideStorageService.md#new-serversidestorageserviceoptions)
- [Methods](ServerSideStorageService.md#methods)
  - [getGridState()](ServerSideStorageService.md#getgridstate)
  - [setGridState()](ServerSideStorageService.md#setgridstate)
- [Properties](ServerSideStorageService.md#properties)
  - [options](ServerSideStorageService.md#options)

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Constructors

### new ServerSideStorageService(options)

```ts
new ServerSideStorageService(options): ServerSideStorageService
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `options` | [`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md) |

#### Returns

[`ServerSideStorageService`](ServerSideStorageService.md)

## Methods

### getGridState()

```ts
getGridState(): Promise<undefined | GridState>
```

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

#### Implementation of

[`StorageService`](../interfaces/StorageService.md).[`getGridState`](../interfaces/StorageService.md#getgridstate)

***

### setGridState()

```ts
setGridState(gridState): Promise<void>
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `gridState` | [`GridState`](../interfaces/GridState.md) |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`void`\>

#### Implementation of

[`StorageService`](../interfaces/StorageService.md).[`setGridState`](../interfaces/StorageService.md#setgridstate)

## Properties

### options

```ts
options: ServerSideStorageServiceOptions;
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
