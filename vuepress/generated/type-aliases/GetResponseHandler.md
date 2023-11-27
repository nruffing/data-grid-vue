# Type alias: GetResponseHandler

```ts
type GetResponseHandler: (response) => Promise<GridState>;
```

## Parameters

| Parameter | Type |
| :------ | :------ |
| `response` | [`Response`]( https://developer.mozilla.org/docs/Web/API/Response ) |

## Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`GridState`](../interfaces/GridState.md)\>

## Description

Callback type to change the [Response](https://developer.mozilla.org/docs/Web/API/Response)
object before it is handled by the data grid from the built-in server side storage service.
This is useful when you need to map the servers response data back to [GridState](../interfaces/GridState.md).

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
