# HeaderFilter

## Description

The filter for a column.

## props

### column

```ts
column: {
  type: PropType<Column>;
  required: true;
};
```

#### Description

The [Column](../interfaces/Column.md) currently being rendered.

#### Type declaration

| Member | Type |
| :------ | :------ |
| `type` | `PropType`\<[`Column`](../interfaces/Column.md)\> |
| `required` | `true` |

***

### initialFilterCondition

```ts
initialFilterCondition: {
  type: PropType<FilterCondition>;
  required: false;
  default: undefined;
};
```

#### Description

The [FilterCondition](../interfaces/FilterCondition.md) for the current column.

#### Default Value

```ts
undefined
```

#### Type declaration

| Member | Type |
| :------ | :------ |
| `type` | `PropType`\<[`FilterCondition`](../interfaces/FilterCondition.md)\> |
| `required` | `false` |
| `default` | `undefined` |

## emits

### updated()

```ts
updated(condition): boolean
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `condition` | [`FilterCondition`](../interfaces/FilterCondition.md) | The updated [FilterCondition](../interfaces/FilterCondition.md) |

#### Returns

`boolean`

#### Description

Event emitted when the [FilterCondition](../interfaces/FilterCondition.md) is updated.
