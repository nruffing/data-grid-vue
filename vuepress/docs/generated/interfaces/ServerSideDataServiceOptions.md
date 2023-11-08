# Interface: ServerSideDataServiceOptions

## Contents

- [Description](ServerSideDataServiceOptions.md#description)
- [See](ServerSideDataServiceOptions.md#see)
- [Properties](ServerSideDataServiceOptions.md#properties)
  - [postRoute](ServerSideDataServiceOptions.md#postroute)
  - [beforeRequest](ServerSideDataServiceOptions.md#beforerequest)
  - [responseHandler](ServerSideDataServiceOptions.md#responsehandler)

## Description

Options to configure the built-in server-side data service including the POST url and optional
callbacks to alter the data format of the request and response allowing. This allows the built-in data service
to handle the data contract of any server.

## See

 - [ServerSideDataService](../classes/ServerSideDataService.md)
 - [dotnet IQueryable helpers](https://www.nuget.org/packages/DataGridVueDotnet/0.0.1-alpha)

## Properties

### postRoute

```ts
postRoute?: string | URL;
```

#### Description

The full HTTP/HTTPS url to send the POST request.
Use [beforeRequest](ServerSideDataServiceOptions.md#beforerequest) callback to alter the HTTP verb or headers.

***

### beforeRequest

```ts
beforeRequest?: BeforeRequestHandler;
```

Optional callback to change the [Request](https://developer.mozilla.org/docs/Web/API/Request)
object before it is sent to the server. This is useful when you need to map the [PageDataRequest](PageDataRequest.md)
to a different data contract.

***

### responseHandler

```ts
responseHandler?: ResponseHandler;
```

Optional callback to change the [Response](https://developer.mozilla.org/docs/Web/API/Response)
object before it is handled by the data grid. This is useful when you need to map the servers response
data back to [PageData](PageData.md).

***

Generated using [typedoc-plugin-markdown](https://www.npmjs.com/package/typedoc-plugin-markdown) and [TypeDoc](https://typedoc.org/)
