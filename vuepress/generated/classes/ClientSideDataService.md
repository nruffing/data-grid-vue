# Class: ClientSideDataService

## Description

The client-side [DataService](../interfaces/DataService.md) used when [DataGridVueGrid.data](../DataGridVueGrid/index.md) is specified.

## Implements

- [`DataService`](../interfaces/DataService.md)

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `dataItems` | `any`[] | - |
| `previousSortJson` | `string` | - |
| `sorted` | `any`[] | - |
| `previousFilterJson` | `string` | - |
| `filtered` | `any`[] | - |

## Constructors

### new ClientSideDataService(dataItems)

```ts
new ClientSideDataService(dataItems): ClientSideDataService
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `dataItems` | `any`[] |

#### Returns

[`ClientSideDataService`](ClientSideDataService.md)

## Methods

### sort()

```ts
sort(sort): void
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `sort` | [`Sort`](../interfaces/Sort.md)[] |

#### Returns

`void`

***

### filter()

```ts
filter(filter): void
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `filter` | `undefined` \| [`Filter`](../interfaces/Filter.md) |

#### Returns

`void`

***

### getPageAsync()

```ts
getPageAsync(
   pageNum, 
   pageSize, 
   sort, 
filter): Promise<PageData>
```

Called to get data for the currently rendered page.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `pageNum` | `number` | The page number for the page to load starting with `1` for the first page.<br />If the data grid is not set configured to be pageable with the [DataGridVueGrid.paged](../DataGridVueGrid/index.md)<br />prop then this will always be `-1`. |
| `pageSize` | `number` | The maximum number of data items to display on each page. If the data grid is<br />not set configured to be pageable with the [DataGridVueGrid.paged](../DataGridVueGrid/index.md) prop then this<br />will always be `-1`. |
| `sort` | [`Sort`](../interfaces/Sort.md)[] | The current column sort definitions in the order in which they should be applied. |
| `filter` | `undefined` \| [`Filter`](../interfaces/Filter.md) | The current filter definition or undefined if no filter is set. |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`PageData`](../interfaces/PageData.md)\>

A Promise that returns the [PageData](../interfaces/PageData.md) for the current page.

#### Implementation of

[`DataService.getPageAsync`](../interfaces/DataService.md)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
