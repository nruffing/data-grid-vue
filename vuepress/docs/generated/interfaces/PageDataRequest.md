# Interface: PageDataRequest

## Contents

- [Description](PageDataRequest.md#description)
- [See](PageDataRequest.md#see)
- [Properties](PageDataRequest.md#properties)
  - [pageNum](PageDataRequest.md#pagenum)
  - [pageSize](PageDataRequest.md#pagesize)
  - [sort](PageDataRequest.md#sort)
  - [filter](PageDataRequest.md#filter)

## Description

Request data interface sent by the [ServerSideDataService](../classes/ServerSideDataService.md). This can be modified before
the HTTP request is sent using the [BeforeRequestHandler](../type-aliases/BeforeRequestHandler.md) callback on [ServerSideDataServiceOptions](ServerSideDataServiceOptions.md).

## See

[dotnet model](https://github.com/nruffing/data-grid-vue-dotnet/blob/main/DataGridVueDotnet/PageDataRequest.cs)

## Properties

### pageNum

```ts
pageNum: number;
```

#### Description

The page number for the page to load starting with `1` for the first page.
If the data grid is not set configured to be pageable with the [DataGridVueGrid.paged](../DataGridVueGrid/README.md#paged)
prop then this will always be `-1`.

***

### pageSize

```ts
pageSize: number;
```

#### Description

The maximum number of data items to display on each page. If the data grid is
not set configured to be pageable with the [DataGridVueGrid.paged](../DataGridVueGrid/README.md#paged) prop then this
will always be `-1`.

***

### sort

```ts
sort: Sort[];
```

#### Description

The current colomn sort definitions in the order in which they should be applied.

***

### filter

```ts
filter: undefined | Filter;
```

#### Description

The current filter definition or undefined if no filter is set.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
