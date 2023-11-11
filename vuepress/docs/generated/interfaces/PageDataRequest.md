# Interface: PageDataRequest

## Description

Request data interface sent by the [ServerSideDataService](../classes/ServerSideDataService.md). This can be modified before
the HTTP request is sent using the [BeforeRequestHandler](../type-aliases/BeforeRequestHandler.md) callback on [ServerSideDataServiceOptions](ServerSideDataServiceOptions.md).

## See

[dotnet model](https://github.com/nruffing/data-grid-vue-dotnet/blob/main/DataGridVueDotnet/PageDataRequest.cs)

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `pageNum` | `number` | **Description**<br /><br />The page number for the page to load starting with `1` for the first page.<br />If the data grid is not set configured to be pageable with the [DataGridVueGrid.paged](../DataGridVueGrid/README.md)<br />prop then this will always be `-1`. |
| `pageSize` | `number` | **Description**<br /><br />The maximum number of data items to display on each page. If the data grid is<br />not set configured to be pageable with the [DataGridVueGrid.paged](../DataGridVueGrid/README.md) prop then this<br />will always be `-1`. |
| `sort` | [`Sort`](Sort.md)[] | **Description**<br /><br />The current colomn sort definitions in the order in which they should be applied. |
| `filter` | `undefined` \| [`Filter`](Filter.md) | **Description**<br /><br />The current filter definition or undefined if no filter is set. |

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
