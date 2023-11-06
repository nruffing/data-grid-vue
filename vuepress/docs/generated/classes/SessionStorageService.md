# Class: SessionStorageService

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Table of contents

### Constructors

- [constructor](SessionStorageService.md#constructor)

### Methods

- [getGridState](SessionStorageService.md#getgridstate)
- [setGridState](SessionStorageService.md#setgridstate)

### Properties

- [key](SessionStorageService.md#key)

## Constructors

### constructor

• **new SessionStorageService**(`key`): [`SessionStorageService`](SessionStorageService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`SessionStorageService`](SessionStorageService.md)

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
