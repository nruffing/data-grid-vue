# PageNavigation

## Contents

- [Description](README.md#description)
- [Properties](README.md#properties)
  - [pageSize](README.md#pagesize)
  - [currentPage](README.md#currentpage)
  - [totalItems](README.md#totalitems)

## Description

The page navigation in the grids footer.

## Properties

### pageSize

```ts
pageSize: {
  type: NumberConstructor;
  required: true;
};
```

#### Description

The current page size.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `NumberConstructor` | - |
| `required` | `true` | - |

***

### currentPage

```ts
currentPage: {
  type: NumberConstructor;
  required: true;
};
```

#### Description

The current page number starting with `1` for the first page.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `NumberConstructor` | - |
| `required` | `true` | - |

***

### totalItems

```ts
totalItems: {
  type: NumberConstructor;
  required: true;
};
```

#### Description

The total number of items in the grid after all filter conditions
have been applied.

#### Type declaration

| Member | Type | Description |
| :------ | :------ | :------ |
| `type` | `NumberConstructor` | - |
| `required` | `true` | - |

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
