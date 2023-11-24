# Type alias: BeforeGetRequestHandler\<TUserId\>

```ts
type BeforeGetRequestHandler<TUserId>: (request, body) => Promise<Request>;
```

## Type parameters

| Parameter | Description |
| :------ | :------ |
| `TUserId` | The type of the user identifier. |

## Parameters

| Parameter | Type |
| :------ | :------ |
| `request` | [`Request`]( https://developer.mozilla.org/docs/Web/API/Request ) |
| `body` | [`GetGridStateRequest`](../interfaces/GetGridStateRequest.md)\<`TUserId`\> |

## Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`Request`]( https://developer.mozilla.org/docs/Web/API/Request )\>

## Description

Callback type to change the [Request](https://developer.mozilla.org/docs/Web/API/Request)
object before it is sent to the server from the built-in server side storage service. This is useful
when you need to map the [GetGridStateRequest](../interfaces/GetGridStateRequest.md) to a different data contract or alter the HTTP verb/headers.

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
