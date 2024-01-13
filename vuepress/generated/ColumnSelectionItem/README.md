# ColumnSelectionItem

## Description

Column toggle item displayed in the column selected menu.

## See

[DataGridVueGrid.showColumnSelection](../DataGridVueGrid/README.md)

## props

### column

```ts
column: {
  type: PropType<Column>;
  required: true;
};
```

#### Description

The [Column](../interfaces/Column.md) to show or hide.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`Column`](../interfaces/Column.md)\> | - |
| `required` | `true` | - |

## emits

### hidden-updated()

```ts
hidden-updated(hidden): boolean
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `hidden` | `boolean` | The new hidden state of the column. |

#### Returns

`boolean`

#### Description

Event emitted when the shown/hidden state of the column has been updated.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
