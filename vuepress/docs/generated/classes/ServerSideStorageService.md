# Class: ServerSideStorageService

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Table of contents

### Constructors

- [constructor](ServerSideStorageService.md#constructor)

### Methods

- [getGridState](ServerSideStorageService.md#getgridstate)
- [setGridState](ServerSideStorageService.md#setgridstate)

### Properties

- [options](ServerSideStorageService.md#options)

## Constructors

### constructor

• **new ServerSideStorageService**(`options`): [`ServerSideStorageService`](ServerSideStorageService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md) |

#### Returns

[`ServerSideStorageService`](ServerSideStorageService.md)

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

### options

• **options**: [`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md)
