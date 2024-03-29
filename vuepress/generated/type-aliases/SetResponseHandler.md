# Type alias: SetResponseHandler

```ts
type SetResponseHandler: (response) => Promise<boolean>;
```

## Description

Callback type to change the [Response](https://developer.mozilla.org/docs/Web/API/Response)
object before it is handled by the data grid from the built-in server side data service.

## Parameters

| Parameter | Type |
| :------ | :------ |
| `response` | [`Response`]( https://developer.mozilla.org/docs/Web/API/Response ) |

## Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<`boolean`\>
