# Class: LocalStorageService

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Table of contents

### Constructors

- [constructor](LocalStorageService.md#constructor)

### Methods

- [getGridState](LocalStorageService.md#getgridstate)
- [setGridState](LocalStorageService.md#setgridstate)

### Properties

- [key](LocalStorageService.md#key)

## Constructors

### constructor

• **new LocalStorageService**(`key`): [`LocalStorageService`](LocalStorageService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`LocalStorageService`](LocalStorageService.md)

## Methods

### getGridState

▸ **getGridState**(): `Promise`\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

#### Returns

`Promise`\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

#### Implementation of

[StorageService](../interfaces/StorageService.md).[getGridState](../interfaces/StorageService.md#getgridstate)

___

### setGridState

▸ **setGridState**(`gridState`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `gridState` | [`GridState`](../interfaces/GridState.md) |

#### Returns

`Promise`\<`void`\>

#### Implementation of

[StorageService](../interfaces/StorageService.md).[setGridState](../interfaces/StorageService.md#setgridstate)

## Properties

### key

• **key**: `string`
