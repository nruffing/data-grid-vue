# Interface: GetGridStateRequest\<TUserId, TGridId\>

## Description

Request data interface sent by the [ServerSideStorageService](../classes/ServerSideStorageService.md) to get the current grid state.

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
