# Interface: GridState

## Description

The data that is saved as part of the grid state.

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `pageSize` | `number` | The current page size |
| `hiddenFields` | `string`[] | The field names of the hiddne columns |
| `sort` | [`Sort`](Sort.md)[] | The current sort definition |
| `filters` | [`FilterCondition`](FilterCondition.md)[] | The current filter conditions |
| `externalFilter` | `undefined` \| [`Filter`](Filter.md) | The current external filter if applied |
| `columnOrder` | `string`[] | The field name of the columns in the order they are currently displayed |

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
