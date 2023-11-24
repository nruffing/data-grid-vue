# Type alias: FieldValueGetter

```ts
type FieldValueGetter: (dataItem) => any | undefined;
```

## Description

Type for optional callback function to map how to retrieve and/or format the columns
value from the data item. Using this callback will include any data modifications or formatting
in sorting and filtering. Similar mapping and formatting could be done with the
cell template slot (i.e. cell-${column.field.fieldName}) but those changes will not
be included in any sorting or filtering.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
