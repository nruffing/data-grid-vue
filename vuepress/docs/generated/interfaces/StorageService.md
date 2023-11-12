# Interface: StorageService

## Description

Interface to implement to define a storage service to save and load grid state.

## Methods

### getGridState()

```ts
getGridState(): Promise<undefined | GridState>
```

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`undefined` \| [`GridState`](GridState.md)\>

#### Description

Retrieves the saved grid state. This is called once when the data grid component is mounted.

***

### setGridState()

```ts
setGridState(gridState): Promise<void>
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `gridState` | [`GridState`](GridState.md) | The grid state to save |

#### Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<`void`\>

#### Description

Saves a new version of the grid state. This called every time data in the grid state changes.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
