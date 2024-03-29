# SetGridStateRequest&lt;TUserId,TGridId&gt; class

Request data interface sent by the data grid to save the current grid state. [Server Side Storage Service](https://datagridvue.com/generated/classes/ServerSideStorageService.html)

```csharp
public class SetGridStateRequest<TUserId, TGridId>
```

| parameter | description |
| --- | --- |
| TUserId | The type of the user identifier. |
| TGridId | The type of the grid identifier. |

## Public Members

| name | description |
| --- | --- |
| [SetGridStateRequest](SetGridStateRequest-2/SetGridStateRequest.md)() | The default constructor. |
| [GridId](SetGridStateRequest-2/GridId.md) { get; set; } | The unique identifier for the current grid. |
| [GridState](SetGridStateRequest-2/GridState.md) { get; set; } | The current grid state to save. |
| [UserId](SetGridStateRequest-2/UserId.md) { get; set; } | The unique identifier for the current user. |

## See Also

* namespace [DataGridVueDotnet](../DataGridVueDotnet.md)
* [SetGridStateRequest.cs](https://github.com/nruffing/data-grid-vue-dotnet/tree/main/DataGridVueDotnet/SetGridStateRequest.cs)

<!-- DO NOT EDIT: generated by xmldocmd for DataGridVueDotnet.dll -->
