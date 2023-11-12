# Type alias: BeforeSetRequestHandler

```ts
type BeforeSetRequestHandler: (request, body) => Promise<Request>;
```

## Parameters

| Parameter | Type |
| :------ | :------ |
| `request` | [`Request`]( https://developer.mozilla.org/en-US/docs/Web/API/Request ) |
| `body` | [`SetGridStateRequest`](../interfaces/SetGridStateRequest.md) |

## Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`Request`]( https://developer.mozilla.org/en-US/docs/Web/API/Request )\>

## Description

Callback type to change the [Request](https://developer.mozilla.org/docs/Web/API/Request)
object before it is sent to the server from the built-in server side storage service. This is useful
when you need to map the [SetGridStateRequest](../interfaces/SetGridStateRequest.md) to a different data contract or alter the HTTP verb/headers.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)