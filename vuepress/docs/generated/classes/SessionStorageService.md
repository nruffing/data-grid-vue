# Class: SessionStorageService

## Contents

- [Implements](SessionStorageService.md#implements)
- [Constructors](SessionStorageService.md#constructors)
  - [new SessionStorageService(key)](SessionStorageService.md#new-sessionstorageservicekey)
- [Methods](SessionStorageService.md#methods)
  - [getGridState()](SessionStorageService.md#getgridstate)
  - [setGridState()](SessionStorageService.md#setgridstate)
- [Properties](SessionStorageService.md#properties)
  - [key](SessionStorageService.md#key)

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Constructors

### new SessionStorageService(key)

```ts
new SessionStorageService(key): SessionStorageService
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`SessionStorageService`](SessionStorageService.md)

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

### key

```ts
key: string;
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
