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

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`Column`](../interfaces/Column.md)\> | - |
| `required` | `true` | - |

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

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `PropType`\<[`FilterCondition`](../interfaces/FilterCondition.md)\> | - |
| `required` | `false` | - |
| `default` | `undefined` | - |

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
