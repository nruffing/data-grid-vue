# Class: LocalStorageService

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Table of contents

### Constructors

- [constructor](LocalStorageService.md#constructor)

### Properties

- [key](LocalStorageService.md#key)

### Methods

- [getGridState](LocalStorageService.md#getgridstate)
- [setGridState](LocalStorageService.md#setgridstate)

## Constructors

### constructor

• **new LocalStorageService**(`key`): [`LocalStorageService`](LocalStorageService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`LocalStorageService`](LocalStorageService.md)

#### Defined in

Storage.d.ts:28

## Properties

### key

• **key**: `string`

#### Defined in

Storage.d.ts:27

## Methods

### getGridState

▸ **getGridState**(): `Promise`\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

#### Returns

`Promise`\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

#### Implementation of

[StorageService](../interfaces/StorageService.md).[getGridState](../interfaces/StorageService.md#getgridstate)

#### Defined in

Storage.d.ts:29

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

Storage.d.ts:30
