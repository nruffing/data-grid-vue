# Interface: DataService

## Implemented by

- [`ClientSideDataService`](../classes/ClientSideDataService.md)
- [`ServerSideDataService`](../classes/ServerSideDataService.md)

## Table of contents

### Properties

- [getPage](DataService.md#getpage)

## Properties

### getPage

• **getPage**: (`pageNum`: `number`, `pageSize`: `number`, `sort`: [`Sort`](Sort.md)[], `filter`: `undefined` \| [`Filter`](Filter.md)) => `Promise`\<[`PageData`](PageData.md)\>

#### Type declaration

▸ (`pageNum`, `pageSize`, `sort`, `filter`): `Promise`\<[`PageData`](PageData.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `pageNum` | `number` |
| `pageSize` | `number` |
| `sort` | [`Sort`](Sort.md)[] |
| `filter` | `undefined` \| [`Filter`](Filter.md) |

##### Returns

`Promise`\<[`PageData`](PageData.md)\>
