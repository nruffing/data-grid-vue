# Class: ServerSideStorageService

## Implements

- [`StorageService`](../interfaces/StorageService.md)

## Table of contents

### Constructors

- [constructor](ServerSideStorageService.md#constructor)

### Properties

- [options](ServerSideStorageService.md#options)

### Methods

- [getGridState](ServerSideStorageService.md#getgridstate)
- [setGridState](ServerSideStorageService.md#setgridstate)

## Constructors

### constructor

• **new ServerSideStorageService**(`options`): [`ServerSideStorageService`](ServerSideStorageService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md) |

#### Returns

[`ServerSideStorageService`](ServerSideStorageService.md)

#### Defined in

Storage.d.ts:54

## Properties

### options

• **options**: [`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md)

#### Defined in

Storage.d.ts:53

## Methods

### getGridState

▸ **getGridState**(): `Promise`\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

#### Returns

`Promise`\<`undefined` \| [`GridState`](../interfaces/GridState.md)\>

#### Implementation of

[StorageService](../interfaces/StorageService.md).[getGridState](../interfaces/StorageService.md#getgridstate)

#### Defined in

Storage.d.ts:55

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

Storage.d.ts:56
