# DataGridVueGrid

## Contents

- [Description](README.md#description)
- [Properties](README.md#properties)
  - [data](README.md#data)
  - [serverSideOptions](README.md#serversideoptions)
  - [customDataService](README.md#customdataservice)
  - [columns](README.md#columns)
  - [allowColumnReorder](README.md#allowcolumnreorder)
  - [paged](README.md#paged)
  - [initialPageSize](README.md#initialpagesize)
  - [pageSizes](README.md#pagesizes)
  - [sortOptions](README.md#sortoptions)
  - [showColumnSelection](README.md#showcolumnselection)
  - [storageKey](README.md#storagekey)
  - [localStorageType](README.md#localstoragetype)
  - [serverSideStorageOptions](README.md#serversidestorageoptions)
  - [customStorageService](README.md#customstorageservice)

## Description

Main entrypoint component to render a data grid.

## Properties

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
is [customDataService](README.md#customdataservice), [serverSideOptions](README.md#serversideoptions), and then [data](README.md#data).
The data grid will not react and rerender when this property changes. If that functionaly is needed it is recommended
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
to handle the data contract of any server. [ServerSideDataService](../classes/ServerSideDataService.md) is used unless [customDataService](README.md#customdataservice)
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
[data](README.md#data) and [serverSideOptions](README.md#serversideoptions) are ignored.

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
In order for columns to rerender after dropping [columns](README.md#columns) should be passed using `v-model:columns`.

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

Whether the data grid should be paged. When this is `false` [PageDataRequest.pageNum](../interfaces/PageDataRequest.md#pagenum) and
[PageDataRequest.pageSize](../interfaces/PageDataRequest.md#pagesize) will be -1.

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
can be set externally using the [Column.hidden](../interfaces/Column.md#hidden) property. For this functionality to work correctly
[columns](README.md#columns) should be passed using `v-model:columns`.

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
sessionStorage is used unless [localStorageType](README.md#localstoragetype) is specified. The data
that is saved as part of the grid state is defined in [GridState](../interfaces/GridState.md).
This is ignored if [serverSideStorageOptions](README.md#serversidestorageoptions) or [customStorageService](README.md#customstorageservice) is specified.

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
To save grid state [storageKey](README.md#storagekey) must be specified.The data
that is saved as part of the grid state is defined in [GridState](../interfaces/GridState.md).
This is ignored if [serverSideStorageOptions](README.md#serversidestorageoptions) or [customStorageService](README.md#customstorageservice) is specified.

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
  type: PropType<ServerSideStorageServiceOptions>;
  required: false;
  default: undefined;
};
```

#### Description

Options to specify to use [ServerSideStorageService](../classes/ServerSideStorageService.md) to retrieve and store [GridState](../interfaces/GridState.md)
[storageKey](README.md#storagekey) and [localStorageType](README.md#localstoragetype) are ignored if this is specified. This is ignored if
[customStorageService](README.md#customstorageservice) is specified.

#### See

[ServerSideStorageServiceOptions](../interfaces/ServerSideStorageServiceOptions.md)

#### Default Value

```ts
undefined
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md)\> | - |
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
When this is specified [storageKey](README.md#storagekey), [localStorageType](README.md#localstoragetype), and [serverSideStorageOptions](README.md#serversidestorageoptions) are ignored.

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

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
