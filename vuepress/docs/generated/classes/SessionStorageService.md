# Class: SessionStorageService

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Table of contents

### Constructors

- [constructor](SessionStorageService.md#constructor)

### Properties

- [key](SessionStorageService.md#key)

### Methods

- [getGridState](SessionStorageService.md#getgridstate)
- [setGridState](SessionStorageService.md#setgridstate)

## Constructors

### constructor

• **new SessionStorageService**(`key`): [`SessionStorageService`](SessionStorageService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`SessionStorageService`](SessionStorageService.md)

#### Defined in

Storage.d.ts:22

## Properties

### key

• **key**: `string`

#### Defined in

Storage.d.ts:21

## Methods

### getGridState

▸ **getGridState**(): `Promise`\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

#### Returns

`Promise`\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

#### Implementation of

[StorageService](../interfaces/StorageService.md).[getGridState](../interfaces/StorageService.md#getgridstate)

#### Defined in

Storage.d.ts:23

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

#### Defined in

Storage.d.ts:24
