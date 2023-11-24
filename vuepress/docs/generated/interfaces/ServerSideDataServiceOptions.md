# Interface: ServerSideDataServiceOptions

## Description

Options to configure the built-in server-side data service including the POST url and optional
callbacks to alter the data format of the request and response allowing. This allows the built-in data service
to handle the data contract of any server. The server-side data service will only attempt to deserialize the response
body if the HTTP status code is `200 OK` and the `Content-Type` response header is `application/json`.

## See

 - [ServerSideDataService](../classes/ServerSideDataService.md)
 - [dotnet IQueryable helpers](https://www.nuget.org/packages/DataGridVueDotnet/0.0.1-alpha)

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `postRoute?` | `string` \| [`URL`]( https://developer.mozilla.org/docs/Web/API/URL ) | **Description**<br />The full HTTP/HTTPS url to send the POST request.<br />Use [beforeRequest](ServerSideDataServiceOptions.md) callback to alter the HTTP verb or headers. |
| `beforeRequest?` | [`BeforeRequestHandler`](../type-aliases/BeforeRequestHandler.md) | Optional callback to change the [Request](https://developer.mozilla.org/docs/Web/API/Request)<br />object before it is sent to the server. This is useful when you need to map the [PageDataRequest](PageDataRequest.md)<br />to a different data contract. |
| `responseHandler?` | [`ResponseHandler`](../type-aliases/ResponseHandler.md) | Optional callback to change the [Response](https://developer.mozilla.org/docs/Web/API/Response)<br />object before it is handled by the data grid. This is useful when you need to map the servers response<br />data back to [PageData](PageData.md). |

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
