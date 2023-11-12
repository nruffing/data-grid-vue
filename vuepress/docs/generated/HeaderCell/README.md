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
  required: false;
  default: undefined;
};
```

#### Description

The current sort for the column or `undefined` if the column is not sorted.

#### Default Value

```ts
undefined
```

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`Sort`](../interfaces/Sort.md)[]\> | - |
| `required` | `false` | - |
| `default` | `undefined` | - |

## emits

### onClick()

```ts
onClick(column): boolean
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `column` | [`Column`](../interfaces/Column.md) | The [Column](../interfaces/Column.md) that was clicked. |

#### Returns

`boolean`

#### Description

Event emitted when the header cell is clicked.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
