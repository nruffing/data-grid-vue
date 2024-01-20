# Interface: StorageService

## Description

Interface to implement to define a storage service to save and load grid state.

## Methods

### getGridStateAsync()

```ts
getGridStateAsync(): Promise<undefined | GridState>
```

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`undefined` \| [`GridState`](GridState.md)\>

A Promise that returns the saved grid state or undefined if no grid state is saved.

#### Description

Retrieves the saved grid state. This is called once when the data grid component is mounted.

***

### setGridStateAsync()

```ts
setGridStateAsync(gridState): Promise<void>
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `gridState` | [`GridState`](GridState.md) | The grid state to save |

#### Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`void`\>

A Promise that returns when the grid state has been saved.

#### Description

Saves a new version of the grid state. This called every time data in the grid state changes.

***

Generated using [TypeDoc](https://typedoc.org) and [typedoc-plugin-markdown](https://typedoc-plugin-markdown.org).
