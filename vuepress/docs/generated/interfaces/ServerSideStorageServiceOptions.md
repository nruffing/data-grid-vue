# Interface: ServerSideStorageServiceOptions`<TUserId>`

## Description

Options to configure the built-in server-side storage service.
The server-side storage service will only attempt to deserialize the response body for `getGridState`
if the HTTP status code is `200 OK` and the `Content-Type` response header is `application/json`.

## See

[ServerSideStorageService](../classes/ServerSideStorageService.md)

## Type parameters

| Parameter | Description |
| :------ | :------ |
| `TUserId` | The type of the user identifier. |

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `userId` | `string` \| `number` | The unique identifier for the current user that will be sent to the server with the get and set requests. |
| `getPostRoute`? | `string` \| [`URL`]( https://developer.mozilla.org/en-US/docs/Web/API/URL ) | **Description**<br /><br />The full HTTP/HTTPS url to send the POST request to retrieve grid state.<br />Use [beforeGetRequest](ServerSideStorageServiceOptions.md) callback to alter the HTTP verb or headers. |
| `beforeGetRequest`? | [`BeforeGetRequestHandler`](../type-aliases/BeforeGetRequestHandler.md)\<`TUserId`\> | Optional callback to change the [Request](https://developer.mozilla.org/docs/Web/API/Request)<br />object before it is sent to the server from the built-in server side storage service. This is useful<br />when you need to map the [GetGridStateRequest](GetGridStateRequest.md) to a different data contract or alter the HTTP verb/headers. |
| `getResponseHandler`? | [`GetResponseHandler`](../type-aliases/GetResponseHandler.md) | Optional callback to change the [Response](https://developer.mozilla.org/docs/Web/API/Response)<br />object before it is handled by the data grid. This is useful when you need to map the servers response<br />data back to [GridState](GridState.md). |
| `setPostRoute`? | `string` \| [`URL`]( https://developer.mozilla.org/en-US/docs/Web/API/URL ) | **Description**<br /><br />The full HTTP/HTTPS url to send the POST request to save grid state.<br />Use [beforeSetRequest](ServerSideStorageServiceOptions.md) callback to alter the HTTP verb or headers. |
| `beforeSetRequest`? | [`BeforeGetRequestHandler`](../type-aliases/BeforeGetRequestHandler.md)\<`TUserId`\> | Optional callback to change the [Request](https://developer.mozilla.org/docs/Web/API/Request)<br />object before it is sent to the server from the built-in server side storage service. This is useful<br />when you need to map the [SetGridStateRequest](SetGridStateRequest.md) to a different data contract or alter the HTTP verb/headers. |
| `setResponseHandler`? | [`GetResponseHandler`](../type-aliases/GetResponseHandler.md) | Optional callback type to change the [Response](https://developer.mozilla.org/docs/Web/API/Response)<br />object before it is handled by the data grid from the built-in server side data service. |

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
