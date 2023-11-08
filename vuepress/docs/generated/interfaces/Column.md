# Interface: Column

## Contents

- [Description](Column.md#description)
- [Properties](Column.md#properties)
  - [title](Column.md#title)
  - [dataType](Column.md#datatype)
  - [field](Column.md#field)
  - [isKey](Column.md#iskey)
  - [sortable](Column.md#sortable)
  - [filterable](Column.md#filterable)
  - [filterOptions](Column.md#filteroptions)
  - [width](Column.md#width)
  - [hidden](Column.md#hidden)

## Description

Column definition

## Properties

### title

```ts
title?: string;
```

#### Description

The value to display in the columns header. If not specified [Field.fieldName](../classes/Field.md#fieldname)
is converted to title casing and displayed as the columns header.

***

### dataType

```ts
dataType: DataType;
```

#### Description

The [DataType](../enumerations/DataType.md) for the column.

***

### field

```ts
field: Field;
```

#### Description

The data [Field](../classes/Field.md) for the column. The [Field](../classes/Field.md) describes how to get the column's value
from the row's data item.

***

### isKey

```ts
isKey?: boolean;
```

#### Description

Whether to use this columns value as the key for the data item. It is highly recommended to set this
on a single column. If more then one column is set as the key column only the first one is used. If no columns are
set as the key column then the first column is used.

***

### sortable

```ts
sortable?: boolean;
```

#### Description

Whether the column should be sortable. This value is ignored if [DataGridVueGrid.sortOptions](../DataGridVueGrid/README.md#sortoptions) is
not set to turn on sorting for the grid. Setting this property to false will then not allow this specific column
to be sorted.

***

### filterable

```ts
filterable?: boolean;
```

#### Description

Whether the column should be filterable. If [filterOptions](Column.md#filteroptions) is not specified then the first
valid [FilterOperator](../enumerations/FilterOperator.md) is used for the columns [DataType](../enumerations/DataType.md). Valid filter operators are defined in
[ValidOperatorsMap](../variables/ValidOperatorsMap.md).

***

### filterOptions

```ts
filterOptions?: ColumnFilterOptions;
```

***

### width

```ts
width?: string;
```

***

### hidden

```ts
hidden?: boolean;
```

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
