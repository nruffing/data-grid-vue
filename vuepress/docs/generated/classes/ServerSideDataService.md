# Class: ServerSideDataService

## Implements

- [`DataService`](../interfaces/DataService.md)

## Table of contents

### Constructors

- [constructor](ServerSideDataService.md#constructor)

### Methods

- [getPage](ServerSideDataService.md#getpage)

### Properties

- [options](ServerSideDataService.md#options)

## Constructors

### constructor

• **new ServerSideDataService**(`options`): [`ServerSideDataService`](ServerSideDataService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ServerSideDataServiceOptions`](../interfaces/ServerSideDataServiceOptions.md) |

#### Returns

[`ServerSideDataService`](ServerSideDataService.md)

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

## Properties

### options

• **options**: [`ServerSideDataServiceOptions`](../interfaces/ServerSideDataServiceOptions.md)
