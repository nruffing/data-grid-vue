# Class: Field

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

## Properties

### fieldName

```ts
fieldName: string;
```

***

### valueGetter

```ts
valueGetter?: FieldValueGetter;
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
