# PageNavigation

## Description

The page navigation in the grids footer.

## props

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

| Member | Type |
| :------ | :------ |
| `type` | `NumberConstructor` |
| `required` | `true` |

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

| Member | Type |
| :------ | :------ |
| `type` | `NumberConstructor` |
| `required` | `true` |

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

| Member | Type |
| :------ | :------ |
| `type` | `NumberConstructor` |
| `required` | `true` |

## emits

### update:currentPage()

```ts
update:currentPage(page): boolean
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `page` | `number` | The new page number. |

#### Returns

`boolean`

#### Description

Event emitted when the page changes.
