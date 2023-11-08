# Type alias: BeforeRequestHandler

```ts
type BeforeRequestHandler: (request, body) => Promise<Request>;
```

Callback type to change the [Request](https://developer.mozilla.org/docs/Web/API/Request)
object before it is sent to the server from the built-in server side data service. This is useful
when you need to map the [PageDataRequest](../interfaces/PageDataRequest.md) to a different data contract.

## Parameters

| Parameter | Type |
| :------ | :------ |
| `request` | [`Request`]( https://developer.mozilla.org/en-US/docs/Web/API/Request ) |
| `body` | [`PageDataRequest`](../interfaces/PageDataRequest.md) |

## Returns

[`Promise`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`Request`]( https://developer.mozilla.org/en-US/docs/Web/API/Request )\>

## See

[dotnet IQueryable helpers](https://www.nuget.org/packages/DataGridVueDotnet/0.0.1-alpha)

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
