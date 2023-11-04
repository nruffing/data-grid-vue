# Interface: StorageService

## Implemented by

- [`LocalStorageService`](../classes/LocalStorageService.md)
- [`ServerSideStorageService`](../classes/ServerSideStorageService.md)
- [`SessionStorageService`](../classes/SessionStorageService.md)

## Table of contents

### Methods

- [getGridState](StorageService.md#getgridstate)
- [setGridState](StorageService.md#setgridstate)

## Methods

### getGridState

▸ **getGridState**(): `Promise`\<`undefined` \| [`GridState`](GridState.md)\>

#### Returns

`Promise`\<`undefined` \| [`GridState`](GridState.md)\>

#### Defined in

Storage.d.ts:16

___

### setGridState

▸ **setGridState**(`gridState`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `gridState` | [`GridState`](GridState.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

Storage.d.ts:17
