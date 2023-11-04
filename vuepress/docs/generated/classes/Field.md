# Class: Field

## Table of contents

### Constructors

- [constructor](Field.md#constructor)

### Properties

- [fieldName](Field.md#fieldname)
- [valueGetter](Field.md#valuegetter)

### Methods

- [resolveValue](Field.md#resolvevalue)

## Constructors

### constructor

• **new Field**(`fieldName`, `valueGetter?`): [`Field`](Field.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `fieldName` | `string` |
| `valueGetter?` | [`FieldValueGetter`](../README.md#fieldvaluegetter) |

#### Returns

[`Field`](Field.md)

#### Defined in

DataGridVue.d.ts:27

## Properties

### fieldName

• **fieldName**: `string`

#### Defined in

DataGridVue.d.ts:25

___

### valueGetter

• `Optional` **valueGetter**: [`FieldValueGetter`](../README.md#fieldvaluegetter)

#### Defined in

DataGridVue.d.ts:26

## Methods

### resolveValue

▸ **resolveValue**(`dataItem`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataItem` | `any` |

#### Returns

`any`

#### Defined in

DataGridVue.d.ts:28
