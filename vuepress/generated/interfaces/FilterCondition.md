# Interface: FilterCondition

## Description

Model definition for the current state of a column filter.

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `fieldName` | `string` | The name of the field being filtered by. |
| `operator` | [`FilterOperator`](../enumerations/FilterOperator.md) | The [FilterOperator](../enumerations/FilterOperator.md) being applied. |
| `dataType` | [`DataType`](../enumerations/DataType.md) | The [DataType](../enumerations/DataType.md) of the column being filtered. |
| `value` | `undefined` \| `string` | The current filter value. |

***

Generated using [TypeDoc](https://typedoc.org) and [typedoc-plugin-markdown](https://typedoc-plugin-markdown.org).
