# Class: Field

## Description

Field definition for the field on the data item's type. The main purpose is to map
that field to a [Column](../interfaces/Column.md).

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `fieldName` | `string` | The name of the field. This should be unique across all fields on the data grid.<br />If [valueGetter](Field.md) is not specified the field name is also assumed to be the property<br />name of the desired value on the data item and is used to retrieve the value from the<br />data item using a direct string index. |
| `valueGetter`? | [`FieldValueGetter`](../type-aliases/FieldValueGetter.md) | An optional callback function to map how to retrieve and/or format the columns<br />value from the data item. Using this callback will include any data modifications or formatting<br />in sorting and filtering. Similar mapping and formatting could be done with the<br />cell template slot (i.e. cell-${column.field.fieldName}) but those changes will not<br />be included in any sorting or filtering. |

## Constructors

### new Field(fieldName, valueGetter)

```ts
new Field(fieldName, valueGetter?): Field
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `fieldName` | `string` |
| `valueGetter`? | [`FieldValueGetter`](../type-aliases/FieldValueGetter.md) |

#### Returns

[`Field`](Field.md)

## Methods

### resolveValue()

```ts
resolveValue(dataItem): any
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `dataItem` | `any` |

#### Returns

`any`

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
