# Interface: SetGridStateRequest\<TUserId, TGridId\>

## Description

Request data interface sent by the [ServerSideStorageService](../classes/ServerSideStorageService.md) to save the current grid state.

## Type parameters

| Type parameter | Description |
| :------ | :------ |
| `TUserId` | The type of the user identifier. |
| `TGridId` | The type of the grid identifier. |

## Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `userId` | `TUserId` | The unique identifier for the current user. |
| `gridId` | `TGridId` | The unique identifier for the specific data grid instance. |
| `gridState` | [`GridState`](GridState.md) | The current grid state to save. |

***

Generated using [TypeDoc](https://typedoc.org) and [typedoc-plugin-markdown](https://typedoc-plugin-markdown.org).
