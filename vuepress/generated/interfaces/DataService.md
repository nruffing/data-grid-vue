# Interface: DataService

## Description

Interface to implement to define a data service to retrieve grid data.

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `getPageAsync` | (`pageNum`: `number`, `pageSize`: `number`, `sort`: [`Sort`](Sort.md)[], `filter`: `undefined` \| [`Filter`](Filter.md)) => [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`PageData`](PageData.md)\> | Called to get data for the currently rendered page.<br /><br />**Param**<br />The page number for the page to load starting with `1` for the first page.<br />If the data grid is not set configured to be pageable with the [DataGridVueGrid.paged](../DataGridVueGrid/README.md)<br />prop then this will always be `-1`.<br /><br />**Param**<br />The maximum number of data items to display on each page. If the data grid is<br />not set configured to be pageable with the [DataGridVueGrid.paged](../DataGridVueGrid/README.md) prop then this<br />will always be `-1`.<br /><br />**Param**<br />The current column sort definitions in the order in which they should be applied.<br /><br />**Param**<br />The current filter definition or undefined if no filter is set. |
