# Variable: ValidOperatorsMap

```ts
const ValidOperatorsMap: Map<DataType, Set<FilterOperator>>;
```

## Description

Map of which [FilterOperator](../enumerations/FilterOperator.md)s are valid for each [DataType](../enumerations/DataType.md).
| Data Type | Valid Operators |
| --- | --- |
| none | |
| alphanumeric | equals, notEquals, contains, startsWith, endsWith |
| number | equals, notEquals, greaterThan, lessThan, greaterThanOrEqualTo, lessThanOrEqualTo |
| date | equals, notEquals, greaterThan, lessThan, greaterThanOrEqualTo, lessThanOrEqualTo |
| dateTime | equals, notEquals, greaterThan, lessThan, greaterThanOrEqualTo, lessThanOrEqualTo |

***

Generated using [TypeDoc](https://typedoc.org) and [typedoc-plugin-markdown](https://typedoc-plugin-markdown.org).
