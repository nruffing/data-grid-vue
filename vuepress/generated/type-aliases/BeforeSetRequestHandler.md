# Type alias: BeforeSetRequestHandler\<TUserId, TGridId\>

```ts
type BeforeSetRequestHandler<TUserId, TGridId>: (request, body) => Promise<Request>;
```

## Description

Callback type to change the [Request](https://developer.mozilla.org/docs/Web/API/Request)
object before it is sent to the server from the built-in server side storage service. This is useful
when you need to map the [SetGridStateRequest](../interfaces/SetGridStateRequest.md) to a different data contract or alter the HTTP verb/headers.

## Type parameters

| Type parameter | Description |
| :------ | :------ |
| `TUserId` | The type of the user identifier. |
| `TGridId` | The type of the grid identifier. |

## Parameters

| Parameter | Type |
| :------ | :------ |
| `request` | [`Request`]( https://developer.mozilla.org/docs/Web/API/Request ) |
| `body` | [`SetGridStateRequest`](../interfaces/SetGridStateRequest.md)\<`TUserId`, `TGridId`\> |

## Returns

[`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`Request`]( https://developer.mozilla.org/docs/Web/API/Request )\>

***

Generated using [TypeDoc](https://typedoc.org) and [typedoc-plugin-markdown](https://typedoc-plugin-markdown.org).
