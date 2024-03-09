# Variable: Formatter

```ts
const Formatter: {
  fromCamelCase: string;
  columnTitle: string;
  ariaColumnLabel: string;
};
```

## Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `fromCamelCase` | `string` | Converts camel-cased field name to be title-cased.<br />For example, firstName -> First Name |
| `columnTitle` | `string` | Gets the column's title. If the column does not have a title the<br />column's field name is converted to title case. |
| `ariaColumnLabel` | `string` | Creates an ARIA label for the column. |
