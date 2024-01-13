# HeaderCell

## Description

The header cell for each column.

## props

### column

```ts
column: {
  type: PropType<Column>;
  required: true;
};
```

#### Description

The [Column](../interfaces/Column.md) being rendered.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`Column`](../interfaces/Column.md)\> | - |
| `required` | `true` | - |

***

### sortable

```ts
sortable: {
  type: BooleanConstructor;
  required: false;
  default: boolean;
};
```

#### Description

Whether sorting is enabled at the grid-level.

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

### sort

```ts
sort: {
  type: PropType<Sort[]>;
  required: true;
};
```

#### Description

The current sort for the entire data grid.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`Sort`](../interfaces/Sort.md)[]\> | - |
| `required` | `true` | - |

***

### allowColumnReorder

```ts
allowColumnReorder: {
  type: BooleanConstructor;
  required: true;
};
```

#### Description

Whether to allow columns to be reordered using drag-and-drop
powered by [drag-drop-vue](https://www.npmjs.com/package/dragon-drop-vue).

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `BooleanConstructor` | - |
| `required` | `true` | - |

***

### columnIndex

```ts
columnIndex: {
  type: NumberConstructor;
  required: true;
};
```

#### Description

The zero-based index of the column that defines the current column order.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `NumberConstructor` | - |
| `required` | `true` | - |

***

### totalColumnCount

```ts
totalColumnCount: {
  type: NumberConstructor;
  required: true;
};
```

#### Description

The total number of columns in the grid.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `NumberConstructor` | - |
| `required` | `true` | - |

## emits

### onClick()

```ts
onClick(columnIndex): boolean
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `columnIndex` | `number` | The zero-based index of the column that defines the current column order. |

#### Returns

`boolean`

#### Description

Event emitted when the header cell is clicked.
This is also emitted when the space bar is pressed and the header cell is focused.

***

### onLeft()

```ts
onLeft(columnIndex): boolean
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `columnIndex` | `number` | The zero-based index of the column that defines the current column order. |

#### Returns

`boolean`

#### Description

Event emitted when the left arrow key is pressed and the header cell is focused.

***

### onRight()

```ts
onRight(columnIndex): boolean
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `columnIndex` | `number` | The zero-based index of the column that defines the current column order. |

#### Returns

`boolean`

#### Description

Event emitted when the right arrow key is pressed and the header cell is focused.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
