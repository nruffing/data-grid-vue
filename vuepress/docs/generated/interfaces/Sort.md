# Interface: Sort

## Contents

- [Description](Sort.md#description)
- [Properties](Sort.md#properties)
  - [fieldName](Sort.md#fieldname)
  - [dataType](Sort.md#datatype)
  - [type](Sort.md#type)

## Description

Column sort definition.

## Properties

### fieldName

```ts
fieldName: string;
```

#### Description

The [Column](Column.md).[Field.fieldName](../classes/Field.md#fieldname) that the data is being sorted by.

***

### dataType

```ts
dataType: DataType;
```

#### Description

The [Column.dataType](Column.md#datatype) for the column being sorted.

#### See

[DataType](../enumerations/DataType.md)

***

### type

```ts
type: SortType;
```

#### Description

The [SortType](../enumerations/SortType.md) for the sort (i.e. ascending or descending).

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
