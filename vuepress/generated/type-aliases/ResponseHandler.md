# Type alias: ResponseHandler

```ts
type ResponseHandler: (response) => Promise<PageData>;
```

## Description

Callback type to change the [Response](https://developer.mozilla.org/docs/Web/API/Response)
object before it is handled by the data grid from the built-in server side data service.
This is useful when you need to map the servers response data back to [PageData](../interfaces/PageData.md).

## See

[dotnet IQueryable helpers](https://www.nuget.org/packages/DataGridVueDotnet/0.0.1-alpha)

## Parameters

| Parameter | Type |
| :------ | :------ |
| `response` | [`Response`]( https://developer.mozilla.org/docs/Web/API/Response ) |

## Returns

[`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`PageData`](../interfaces/PageData.md)\>
