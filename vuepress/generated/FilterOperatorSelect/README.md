# FilterOperatorSelect

## Description

The filter operator select control that is displayed when a column
is configured with more then one filter operator.

## See

 - [Column.filterable](../interfaces/Column.md)
 - [Column.filterOptions](../interfaces/Column.md)
 - [FilterOperator](../enumerations/FilterOperator.md)

## props

### operators

```ts
operators: {
  type: PropType<FilterOperator[]>;
  required: true;
};
```

#### Description

The [FilterOperator](../enumerations/FilterOperator.md) values configured on the [Column](../interfaces/Column.md).

#### Type declaration

| Member | Type |
| :------ | :------ |
| `type` | `PropType`\<[`FilterOperator`](../enumerations/FilterOperator.md)[]\> |
| `required` | `true` |

***

### modelValue

```ts
modelValue: {
  type: PropType<FilterOperator>;
  required: false;
  default: FilterOperator;
};
```

#### Description

The selected [FilterOperator](../enumerations/FilterOperator.md).

#### Default Value

```ts
FilterOperator.equals
```

#### Type declaration

| Member | Type |
| :------ | :------ |
| `type` | `PropType`\<[`FilterOperator`](../enumerations/FilterOperator.md)\> |
| `required` | `false` |
| `default` | [`FilterOperator`](../enumerations/FilterOperator.md) |

## emits

### update:modelValue()

```ts
update:modelValue(operator): boolean
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `operator` | [`FilterOperator`](../enumerations/FilterOperator.md) | The new [FilterOperator](../enumerations/FilterOperator.md) state. |

#### Returns

`boolean`

#### Description

Event emitted when the [FilterOperator](../enumerations/FilterOperator.md) state has been updated.
