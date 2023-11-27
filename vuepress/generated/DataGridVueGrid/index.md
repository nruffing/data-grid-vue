# DataGridVueGrid

## Description

Main entrypoint component to render a data grid.

## props

### data

```ts
data: {
  type: PropType<any[]>;
  required: false;
  default: undefined;
};
```

#### Description

Array of objects to display in the data grid when using the built-in [ClientSideDataService](../classes/ClientSideDataService.md).
This prop is required unless serverSideOptions or customDataService is supplied. The order of precedence
is [customDataService](index.md), [serverSideOptions](index.md), and then [data](index.md).
The data grid will not react and rerender when this property changes. If that functionality is needed it is recommended
to leverage `v-if` to force a new component instance to render.

#### Default Value

```ts
undefined
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<`any`[]\> | - |
| `required` | `false` | - |
| `default` | `undefined` | - |

***

### serverSideOptions

```ts
serverSideOptions: {
  type: PropType<ServerSideDataServiceOptions>;
  required: false;
  default: undefined;
};
```

#### Description

Options to configure the built-in server-side data service including the POST url and optional
callbacks to alter the data format of the request and response allowing. This allows the built-in data service
to handle the data contract of any server. [ServerSideDataService](../classes/ServerSideDataService.md) is used unless [customDataService](index.md)
is also specified.

#### See

[dotnet IQueryable helpers](https://www.nuget.org/packages/DataGridVueDotnet/0.0.1-alpha)

#### Default Value

```ts
undefined
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`ServerSideDataServiceOptions`](../interfaces/ServerSideDataServiceOptions.md)\> | - |
| `required` | `false` | - |
| `default` | `undefined` | - |

***

### customDataService

```ts
customDataService: {
  type: PropType<DataService>;
  required: false;
  default: undefined;
};
```

#### Description

Custom implementation of [DataService](../interfaces/DataService.md) to supply the grid's data. When this is specified
[data](index.md) and [serverSideOptions](index.md) are ignored.

#### Default Value

```ts
undefined
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`DataService`](../interfaces/DataService.md)\> | - |
| `required` | `false` | - |
| `default` | `undefined` | - |

***

### columns

```ts
columns: {
  type: PropType<Column[]>;
  required: true;
};
```

#### Description

[Column](../interfaces/Column.md) definitions to configure data grid columns including header title, column width, custom data getter,
and column specific filtering and sorting options. It is recommended to supply an array of objects with `v-model:columns` since
that is required for column reordering and allowing users to show/hide specific columns to rerender the columns.
[Column](../interfaces/Column.md) objects will not be mutated but a new array will be emitted with the `update:columns` event and that needs to trigger
this property to get an updated value. The grid will react to any change to this prop which can be leveraged to implement custom
functionality to do things like allowing users to add/remove columns.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`Column`](../interfaces/Column.md)[]\> | - |
| `required` | `true` | - |

***

### allowColumnReorder

```ts
allowColumnReorder: {
  type: BooleanConstructor;
  required: false;
  default: boolean;
};
```

#### Description

Whether to allow columns to be reordered using drag-and-drop
powered by [drag-drop-vue](https://www.npmjs.com/package/dragon-drop-vue).
In order for columns to rerender after dropping [columns](index.md) should be passed using `v-model:columns`.

#### Default Value

```ts
false
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `BooleanConstructor` | - |
| `required` | `false` | - |
| `default` | `boolean` | - |

***

### paged

```ts
paged: {
  type: BooleanConstructor;
  required: false;
  default: boolean;
};
```

#### Description

Whether the data grid should be paged. When this is `false` [PageDataRequest.pageNum](../interfaces/PageDataRequest.md) and
[PageDataRequest.pageSize](../interfaces/PageDataRequest.md) will be -1.

#### Default Value

```ts
true
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `BooleanConstructor` | - |
| `required` | `false` | - |
| `default` | `boolean` | - |

***

### initialPageSize

```ts
initialPageSize: {
  type: NumberConstructor;
  required: false;
  default: number;
};
```

#### Description

The page size to use when the grid initially loads.

#### Default Value

```ts
15
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `NumberConstructor` | - |
| `required` | `false` | - |
| `default` | `number` | - |

***

### pageSizes

```ts
pageSizes: {
  type: PropType<number[]>;
  required: false;
  default: number[];
};
```

#### Description

The page sizes to allow the user to select between. The page size select
will only be displayed if this array contains more then one value.

#### Default Value

```ts
[15, 25, 50]
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<`number`[]\> | - |
| `required` | `false` | - |
| `default` | `number`[] | - |

***

### sortOptions

```ts
sortOptions: {
  type: PropType<SortOptions>;
  required: false;
  default: undefined;
};
```

#### Description

Grid-level [SortOptions](../interfaces/SortOptions.md) including whether to allow sorting and if more then
one column can be sorted at a time. The grid must be set as sortable for any column level sort
options to take effect.

#### Default Value

```ts
undefined
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`SortOptions`](../interfaces/SortOptions.md)\> | - |
| `required` | `false` | - |
| `default` | `undefined` | - |

***

### showColumnSelection

```ts
showColumnSelection: {
  type: BooleanConstructor;
  required: false;
  default: boolean;
};
```

#### Description

Whether to display the `Add/Remove Columns` menu in the options header. Column selection
can be set externally using the [Column.hidden](../interfaces/Column.md) property. For this functionality to work correctly
[columns](index.md) should be passed using `v-model:columns`.

#### Default Value

```ts
false
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `BooleanConstructor` | - |
| `required` | `false` | - |
| `default` | `boolean` | - |

***

### storageKey

```ts
storageKey: {
  type: StringConstructor;
  required: false;
  default: string;
};
```

#### Description

A key to use to save grid state in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
or [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
sessionStorage is used unless [localStorageType](index.md) is specified. The data
that is saved as part of the grid state is defined in [GridState](../interfaces/GridState.md).
This is ignored if [serverSideStorageOptions](index.md) or [customStorageService](index.md) is specified.

#### See

 - [SessionStorageService](../classes/SessionStorageService.md)
 - [LocalStorageService](../classes/LocalStorageService.md)

#### Default Value

```ts
''
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `StringConstructor` | - |
| `required` | `false` | - |
| `default` | `string` | - |

***

### localStorageType

```ts
localStorageType: {
  type: NumberConstructor;
  required: false;
  default: LocalStorageType;
};
```

#### Description

Whether grid state is stored in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
or [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).
To save grid state [storageKey](index.md) must be specified.The data
that is saved as part of the grid state is defined in [GridState](../interfaces/GridState.md).
This is ignored if [serverSideStorageOptions](index.md) or [customStorageService](index.md) is specified.

#### See

 - [SessionStorageService](../classes/SessionStorageService.md)
 - [LocalStorageService](../classes/LocalStorageService.md)

#### Default Value

```ts
LocalStorageType.sessionStorage
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `NumberConstructor` | - |
| `required` | `false` | - |
| `default` | [`LocalStorageType`](../enumerations/LocalStorageType.md) | - |

***

### serverSideStorageOptions

```ts
serverSideStorageOptions: {
  type: PropType<ServerSideStorageServiceOptions<any, any>>;
  required: false;
  default: undefined;
};
```

#### Description

Options to specify to use [ServerSideStorageService](../classes/ServerSideStorageService.md) to retrieve and store [GridState](../interfaces/GridState.md)
[storageKey](index.md) and [localStorageType](index.md) are ignored if this is specified. This is ignored if
[customStorageService](index.md) is specified.

#### See

[ServerSideStorageServiceOptions](../interfaces/ServerSideStorageServiceOptions.md)

#### Default Value

```ts
undefined
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md)\<`any`, `any`\>\> | - |
| `required` | `false` | - |
| `default` | `undefined` | - |

***

### customStorageService

```ts
customStorageService: {
  type: PropType<StorageService>;
  required: false;
  default: undefined;
};
```

#### Description

Custom implementation of [StorageService](../interfaces/StorageService.md) to optionally retrieve/store [GridState](../interfaces/GridState.md).
When this is specified [storageKey](index.md), [localStorageType](index.md), and [serverSideStorageOptions](index.md) are ignored.

#### Default Value

```ts
undefined
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`StorageService`](../interfaces/StorageService.md)\> | - |
| `required` | `false` | - |
| `default` | `undefined` | - |

## emits

### update:columns()

```ts
update:columns(columns): boolean
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `columns` | [`Column`](../interfaces/Column.md)[] | A clone of the new column state. |

#### Returns

`boolean`

#### Description

Event emitted when [Column](../interfaces/Column.md) state is updated. This includes the column's hidden state and column order.
[Column](../interfaces/Column.md) objects will not be mutated but a new array will be emitted with this event and that needs to trigger
the columns prop to update. Leveraging `v-model:columns` is recommended.

## slots

### filter-$\{column.field.fieldName}

```ts
filter-${column.field.fieldName}: {
  column: Column;
  initialFilterCondition: FilterCondition;
  onFilterUpdated: (condition) => any;
};
```

#### Description

Slot to override the filter for the specified column. For example, the slot name `filter-id` would override the filter for the column with a field with the name `id`.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `column` | [`Column`](../interfaces/Column.md) | The current [Column](../interfaces/Column.md). |
| `initialFilterCondition` | [`FilterCondition`](../interfaces/FilterCondition.md) | The current [FilterCondition](../interfaces/FilterCondition.md) applied to the column. |
| `onFilterUpdated` | `(condition) => any` | Function to call when the filter condition has been updated to trigger the grid state to update. The function has a [FilterCondition](../interfaces/FilterCondition.md) parameter to pass the new condition. |

***

### cell-$\{column.field.fieldName}

```ts
cell-${column.field.fieldName}: {
  dataItem: any;
};
```

#### Description

Slot to override the cell for the specified column. For example, the slot name `cell-id` would override the cell for the column with a field with the name `id`.
Any data modifications or formatting done as part of the cell template will not be taken into account for filtering and sorting. If the desired behavior is to also sort and filter
based on the formatted value use Field.valueGetter instead.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `dataItem` | `any` | The entire data item for the current row. |

***

### options-header

```ts
options-header: {
  toggleFilterOptionsShown: () => any;
  toggleColumnSelectionShown: (event) => any;
  clearFilters: () => any;
  filter: Filter | undefined;
  filterOptionsShown: boolean;
  filterSummary: string;
  clearSort: () => any;
  sort: Sort[];
};
```

#### Description

Slot to override what is rendered in the options header above the data grid.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `toggleFilterOptionsShown` | `() => any` | Function to call to toggle whether to display the filter row below the data grid's header. |
| `toggleColumnSelectionShown` | `(event) => any` | Function to call to toggle whether to display the column selection menu.<br />The function has a single Event parameter which is the click  or key event that triggered the toggle. |
| `clearFilters` | `() => any` | Function to call to clear all current filter state. |
| `filter` | [`Filter`](../interfaces/Filter.md) \| `undefined` | The current filter state |
| `filterOptionsShown` | `boolean` | Whether or not the filter row is currently displayed. |
| `filterSummary` | `string` | A string summary of the current filters applied to the data grid. |
| `clearSort` | `() => any` | Function to call to clear all current sort state. |
| `sort` | [`Sort`](../interfaces/Sort.md)[] | The current sort state |

***

### options-header-filter-options-shown

```ts
options-header-filter-options-shown: {
  toggleFilterOptionsShown: () => any;
  filterOptionsShown: boolean;
};
```

#### Description

Slot to override just the toggle column filters area of the options header above the grid.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `toggleFilterOptionsShown` | `() => any` | Function to call to toggle whether to display the filter row below the data grid's header. |
| `filterOptionsShown` | `boolean` | Whether or not the filter row is currently displayed. |

***

### options-header-clear-filters

```ts
options-header-clear-filters: {
  clearFilters: () => any;
  filter: Filter | undefined;
  filterSummary: string;
  clearSort: () => any;
  sort: Sort[];
};
```

#### Description

Slot to override just the clear filters area of the options header above the grid.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `clearFilters` | `() => any` | Function to call to clear all current filter state. |
| `filter` | [`Filter`](../interfaces/Filter.md) \| `undefined` | The current filter state |
| `filterSummary` | `string` | A string summary of the current filters applied to the data grid. |
| `clearSort` | `() => any` | Function to call to clear all current sort state. |
| `sort` | [`Sort`](../interfaces/Sort.md)[] | The current sort state |

***

### options-header-column-selection-shown

```ts
options-header-column-selection-shown: {
  toggleColumnSelectionShown: (event) => any;
};
```

#### Description

Slot to override just the add/remove columns area of the options header above the grid.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `toggleColumnSelectionShown` | `(event) => any` | Function to call to toggle whether to display the column selection menu.<br />The function has a single Event parameter which is the click  or key event that triggered the toggle. |

***

### column-selection-popup

```ts
column-selection-popup: {
  columns: Column[];
  onHiddenUpdated: (column, hidden) => any;
};
```

#### Description

Slot to override what is rendered in the add/remove columns menu.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `columns` | [`Column`](../interfaces/Column.md)[] | All current column state. |
| `onHiddenUpdated` | `(column, hidden) => any` | Function to call when the hidden state of a column should be changed. The function has a [Column](../interfaces/Column.md) parameter and a boolean hidden parameter. |

***

### footer

```ts
footer: {
  paged: boolean;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onCurrentPageChangedAsync: (page) => Promise<any>;
  onPageSizeChangedAsync: (pageSize) => Promise<any>;
};
```

#### Description

Slot to override the entire footer of the data grid.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `paged` | `boolean` | Whether the grid is paged. |
| `currentPage` | `number` | The current page number starting with `1` for the first page. |
| `pageSize` | `number` | The current page size. |
| `totalItems` | `number` | The total number of items in the grid after all filter conditions have been applied. |
| `onCurrentPageChangedAsync` | `(page) => Promise<any>` | Function to call when the current page changes. Promise resolves when the new page data is loaded. |
| `onPageSizeChangedAsync` | `(pageSize) => Promise<any>` | Function to call when the page size has changed. Promise resolves when the new page data is loaded. |

***

### footer-page-size-select

```ts
footer-page-size-select: {
  pageSize: number;
  pageSizes: number[];
  onPageSizeChangedAsync: (pageSize) => Promise<any>;
};
```

#### Description

Slot to override the page size select in the footer of the data grid.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `pageSize` | `number` | The current page size. |
| `pageSizes` | `number`[] | The page sizes to allow the user to select between. |
| `onPageSizeChangedAsync` | `(pageSize) => Promise<any>` | Function to call when the page size has changed. Promise resolves when the new page data is loaded. |

***

### footer-additional-content

```ts
footer-additional-content: {};
```

#### Description

Slot to add custom content to the footer of the data grid. The content is rendered after the page size select.

***

### footer-total-items

```ts
footer-total-items: {
  totalItems: number;
};
```

#### Description

Slot to override the total items in the footer of the data grid.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `totalItems` | `number` | The total number of items in the grid after all filter conditions have been applied. |

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
