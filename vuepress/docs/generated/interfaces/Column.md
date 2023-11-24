# Interface: Column

## Description

Column definition

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `title?` | `string` | **Description**<br />The value to display in the columns header. If not specified [Field.fieldName](../classes/Field.md)<br />is converted to title casing and displayed as the columns header. |
| `dataType` | [`DataType`](../enumerations/DataType.md) | **Description**<br />The [DataType](../enumerations/DataType.md) for the column. |
| `field` | [`Field`](../classes/Field.md) | **Description**<br />The data [Field](../classes/Field.md) for the column. The [Field](../classes/Field.md) describes how to get the column's value<br />from the row's data item. |
| `isKey?` | `boolean` | **Description**<br />Whether to use this columns value as the key for the data item. It is highly recommended to set this<br />on a single column. If more then one column is set as the key column only the first one is used. If no columns are<br />set as the key column then the first column is used. |
| `sortable?` | `boolean` | **Description**<br />Whether the column should be sortable. This value is ignored if [DataGridVueGrid.sortOptions](../DataGridVueGrid/index.md) is<br />not set to turn on sorting for the grid. Setting this property to false will then not allow this specific column<br />to be sorted. |
| `filterable?` | `boolean` | **Description**<br />Whether the column should be filterable. If [filterOptions](Column.md) is not specified then the first<br />valid [FilterOperator](../enumerations/FilterOperator.md) is used for the columns [DataType](../enumerations/DataType.md). Valid filter operators are defined in<br />[ValidOperatorsMap](../variables/ValidOperatorsMap.md). |
| `filterOptions?` | [`ColumnFilterOptions`](ColumnFilterOptions.md) | **Description**<br />Additional options for how the column's filter behaves including the [FilterOperator](../enumerations/FilterOperator.md)s to<br />allow the user to select from. Valid filter operators are defined in [ValidOperatorsMap](../variables/ValidOperatorsMap.md). |
| `width?` | `string` | **Description**<br />Optionally specify an absolute or relative column width. Column widths can be specified with px, % or *.<br />By default columns without a width specified will take up an equal share of the remaining space.<br />The relative * unit can be used to specify a column to take a relational share of the remaining space.<br />Column widths automatically regenerate when the window/page size changes. |
| `hidden?` | `boolean` | **Description**<br />Whether the column is currently hidden. |

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
