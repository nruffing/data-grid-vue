# Class: ServerSideDataService

## Implements

- [`DataService`](../interfaces/DataService.md)

## Table of contents

### Constructors

- [constructor](ServerSideDataService.md#constructor)

### Properties

- [options](ServerSideDataService.md#options)

### Methods

- [getPage](ServerSideDataService.md#getpage)

## Constructors

### constructor

• **new ServerSideDataService**(`options`): [`ServerSideDataService`](ServerSideDataService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ServerSideDataServiceOptions`](../interfaces/ServerSideDataServiceOptions.md) |

#### Returns

[`ServerSideDataService`](ServerSideDataService.md)

#### Defined in

DataService.d.ts:34

## Properties

### options

• **options**: [`ServerSideDataServiceOptions`](../interfaces/ServerSideDataServiceOptions.md)

#### Defined in

DataService.d.ts:33

## Methods

### getPage

▸ **getPage**(`pageNum`, `pageSize`, `sort`, `filter`): `Promise`\<[`PageData`](../interfaces/PageData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pageNum` | `number` |
| `pageSize` | `number` |
| `sort` | [`Sort`](../interfaces/Sort.md)[] |
| `filter` | `undefined` \| [`Filter`](../interfaces/Filter.md) |

#### Returns

`Promise`\<[`PageData`](../interfaces/PageData.md)\>

#### Implementation of

[DataService](../interfaces/DataService.md).[getPage](../interfaces/DataService.md#getpage)

#### Defined in

DataService.d.ts:35
