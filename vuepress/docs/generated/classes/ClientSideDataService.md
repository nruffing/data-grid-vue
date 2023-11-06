# Class: ClientSideDataService

## Implements

- [`DataService`](../interfaces/DataService.md)

## Table of contents

### Constructors

- [constructor](ClientSideDataService.md#constructor)

### Methods

- [sort](ClientSideDataService.md#sort)
- [filter](ClientSideDataService.md#filter)
- [getPage](ClientSideDataService.md#getpage)

### Properties

- [dataItems](ClientSideDataService.md#dataitems)
- [previousSortJson](ClientSideDataService.md#previoussortjson)
- [sorted](ClientSideDataService.md#sorted)
- [previousFilterJson](ClientSideDataService.md#previousfilterjson)
- [filtered](ClientSideDataService.md#filtered)

## Constructors

### constructor

• **new ClientSideDataService**(`dataItems`): [`ClientSideDataService`](ClientSideDataService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataItems` | `any`[] |

#### Returns

[`ClientSideDataService`](ClientSideDataService.md)

## Methods

### sort

▸ **sort**(`sort`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sort` | [`Sort`](../interfaces/Sort.md)[] |

#### Returns

`void`

___

### filter

▸ **filter**(`filter`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | `undefined` \| [`Filter`](../interfaces/Filter.md) |

#### Returns

`void`

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

## Properties

### dataItems

• **dataItems**: `any`[]

___

### previousSortJson

• **previousSortJson**: `string`

___

### sorted

• **sorted**: `any`[]

___

### previousFilterJson

• **previousFilterJson**: `string`

___

### filtered

• **filtered**: `any`[]
