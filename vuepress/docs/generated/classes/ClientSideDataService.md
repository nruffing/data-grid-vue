# Class: ClientSideDataService

## Implements

- [`DataService`](../interfaces/DataService.md)

## Table of contents

### Constructors

- [constructor](ClientSideDataService.md#constructor)

### Properties

- [dataItems](ClientSideDataService.md#dataitems)
- [filtered](ClientSideDataService.md#filtered)
- [previousFilterJson](ClientSideDataService.md#previousfilterjson)
- [previousSortJson](ClientSideDataService.md#previoussortjson)
- [sorted](ClientSideDataService.md#sorted)

### Methods

- [filter](ClientSideDataService.md#filter)
- [getPage](ClientSideDataService.md#getpage)
- [sort](ClientSideDataService.md#sort)

## Constructors

### constructor

• **new ClientSideDataService**(`dataItems`): [`ClientSideDataService`](ClientSideDataService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataItems` | `any`[] |

#### Returns

[`ClientSideDataService`](ClientSideDataService.md)

#### Defined in

DataService.d.ts:14

## Properties

### dataItems

• **dataItems**: `any`[]

#### Defined in

DataService.d.ts:9

___

### filtered

• **filtered**: `any`[]

#### Defined in

DataService.d.ts:13

___

### previousFilterJson

• **previousFilterJson**: `string`

#### Defined in

DataService.d.ts:12

___

### previousSortJson

• **previousSortJson**: `string`

#### Defined in

DataService.d.ts:10

___

### sorted

• **sorted**: `any`[]

#### Defined in

DataService.d.ts:11

## Methods

### filter

▸ **filter**(`filter`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `undefined` \| [`Filter`](../interfaces/Filter.md) |

#### Returns

`void`

#### Defined in

DataService.d.ts:16

___

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

DataService.d.ts:17

___

### sort

▸ **sort**(`sort`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sort` | [`Sort`](../interfaces/Sort.md)[] |

#### Returns

`void`

#### Defined in

DataService.d.ts:15
