# Interface: DataService

## Contents

- [Description](DataService.md#description)
- [Properties](DataService.md#properties)
  - [getPage](DataService.md#getpage)

## Description

Interface to implement to define a data service to retrieve grid data.

## Properties

### getPage

```ts
getPage: (pageNum, pageSize, sort, filter) => Promise<PageData>;
```

Called to get data for the currently rendered page.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `pageNum` | `number` | The page number for the page to load starting with `1` for the first page.<br />If the data grid is not set configured to be pageable with the [DataGridVueGrid.paged](../DataGridVueGrid/README.md#paged)<br />prop then this will always be `-1`. |
| `pageSize` | `number` | The maximum number of data items to display on each page. If the data grid is<br />not set configured to be pageable with the [DataGridVueGrid.paged](../DataGridVueGrid/README.md#paged) prop then this<br />will always be `-1`. |
| `sort` | [`Sort`](Sort.md)[] | The current colomn sort definitions in the order in which they should be applied. |
| `filter` | `undefined` \| [`Filter`](Filter.md) | The current filter definition or undefined if no filter is set. |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`PageData`](PageData.md)\>

A Promise that returns the [PageData](PageData.md) for the current page.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
