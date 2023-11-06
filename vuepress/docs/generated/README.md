# Documentation

## Table of contents

### Data Grid Component

- [DataGridVueGrid](modules/DataGridVueGrid.md)

### Components

- [ColumnSelectionItem](modules/ColumnSelectionItem.md)
- [FilterOperatorSelect](modules/FilterOperatorSelect.md)
- [HeaderCell](modules/HeaderCell.md)
- [HeaderFilter](modules/HeaderFilter.md)
- [Icon](modules/Icon.md)
- [PageNavigation](modules/PageNavigation.md)

### Classes

- [Field](classes/Field.md)
- [ClientSideDataService](classes/ClientSideDataService.md)
- [ServerSideDataService](classes/ServerSideDataService.md)
- [SessionStorageService](classes/SessionStorageService.md)
- [LocalStorageService](classes/LocalStorageService.md)
- [ServerSideStorageService](classes/ServerSideStorageService.md)

### Enumerations

- [DataType](enums/DataType.md)
- [FilterOperator](enums/FilterOperator.md)
- [SortType](enums/SortType.md)
- [LocalStorageType](enums/LocalStorageType.md)

### Interfaces

- [Column](interfaces/Column.md)
- [ColumnFilterOptions](interfaces/ColumnFilterOptions.md)
- [PageData](interfaces/PageData.md)
- [DataService](interfaces/DataService.md)
- [PageDataRequest](interfaces/PageDataRequest.md)
- [ServerSideDataServiceOptions](interfaces/ServerSideDataServiceOptions.md)
- [FilterOptions](interfaces/FilterOptions.md)
- [FilterCondition](interfaces/FilterCondition.md)
- [Filter](interfaces/Filter.md)
- [DataGridVueOptions](interfaces/DataGridVueOptions.md)
- [SortOptions](interfaces/SortOptions.md)
- [Sort](interfaces/Sort.md)
- [GridState](interfaces/GridState.md)
- [StorageService](interfaces/StorageService.md)
- [GetGridStateRequest](interfaces/GetGridStateRequest.md)
- [SetGridStateRequest](interfaces/SetGridStateRequest.md)
- [ServerSideStorageServiceOptions](interfaces/ServerSideStorageServiceOptions.md)

### Type Aliases

- [FieldValueGetter](README.md#fieldvaluegetter)
- [BeforeRequestHandler](README.md#beforerequesthandler)
- [ResponseHandler](README.md#responsehandler)
- [BeforeGetRequestHandler](README.md#beforegetrequesthandler)
- [GetResponseHandler](README.md#getresponsehandler)
- [BeforeSetRequestHandler](README.md#beforesetrequesthandler)
- [SetResponseHandler](README.md#setresponsehandler)

### Variables

- [EmptyPageData](README.md#emptypagedata)
- [StubDataService](README.md#stubdataservice)
- [ValidOperatorsMap](README.md#validoperatorsmap)
- [ClientSideFilter](README.md#clientsidefilter)
- [Formatter](README.md#formatter)
- [DataGridVue](README.md#datagridvue)
- [ClientSideSort](README.md#clientsidesort)
- [StubStorageService](README.md#stubstorageservice)

## Type Aliases

### FieldValueGetter

Ƭ **FieldValueGetter**: (`dataItem`: `any`) => `any` \| `undefined`

___

### BeforeRequestHandler

Ƭ **BeforeRequestHandler**: (`request`: `Request`, `body`: [`PageDataRequest`](interfaces/PageDataRequest.md)) => `Promise`\<`Request`\>

#### Type declaration

▸ (`request`, `body`): `Promise`\<`Request`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request` |
| `body` | [`PageDataRequest`](interfaces/PageDataRequest.md) |

##### Returns

`Promise`\<`Request`\>

___

### ResponseHandler

Ƭ **ResponseHandler**: (`response`: `Response`) => `Promise`\<[`PageData`](interfaces/PageData.md)\>

#### Type declaration

▸ (`response`): `Promise`\<[`PageData`](interfaces/PageData.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `Response` |

##### Returns

`Promise`\<[`PageData`](interfaces/PageData.md)\>

___

### BeforeGetRequestHandler

Ƭ **BeforeGetRequestHandler**: (`request`: `Request`, `body`: [`GetGridStateRequest`](interfaces/GetGridStateRequest.md)) => `Promise`\<`Request`\>

#### Type declaration

▸ (`request`, `body`): `Promise`\<`Request`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request` |
| `body` | [`GetGridStateRequest`](interfaces/GetGridStateRequest.md) |

##### Returns

`Promise`\<`Request`\>

___

### GetResponseHandler

Ƭ **GetResponseHandler**: (`response`: `Response`) => `Promise`\<[`GridState`](interfaces/GridState.md)\>

#### Type declaration

▸ (`response`): `Promise`\<[`GridState`](interfaces/GridState.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `Response` |

##### Returns

`Promise`\<[`GridState`](interfaces/GridState.md)\>

___

### BeforeSetRequestHandler

Ƭ **BeforeSetRequestHandler**: (`request`: `Request`, `body`: [`SetGridStateRequest`](interfaces/SetGridStateRequest.md)) => `Promise`\<`Request`\>

#### Type declaration

▸ (`request`, `body`): `Promise`\<`Request`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `Request` |
| `body` | [`SetGridStateRequest`](interfaces/SetGridStateRequest.md) |

##### Returns

`Promise`\<`Request`\>

___

### SetResponseHandler

Ƭ **SetResponseHandler**: (`response`: `Response`) => `Promise`\<`boolean`\>

#### Type declaration

▸ (`response`): `Promise`\<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `response` | `Response` |

##### Returns

`Promise`\<`boolean`\>

## Variables

### EmptyPageData

• `Const` **EmptyPageData**: [`PageData`](interfaces/PageData.md)

___

### StubDataService

• `Const` **StubDataService**: [`DataService`](interfaces/DataService.md)

___

### ValidOperatorsMap

• `Const` **ValidOperatorsMap**: `Map`\<[`DataType`](enums/DataType.md), `Set`\<[`FilterOperator`](enums/FilterOperator.md)\>\>

___

### ClientSideFilter

• `Const` **ClientSideFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `filter` | (`filter`: [`Filter`](interfaces/Filter.md), `dataItems`: `any`[]) => `any`[] |
| `evaluateFilter` | (`filter`: [`Filter`](interfaces/Filter.md), `dataItem`: `any`) => `boolean` |
| `evaluateConditions` | (`conditions`: [`FilterCondition`](interfaces/FilterCondition.md)[], `dataItem`: `any`) => `boolean` |
| `evaluateCondition` | (`condition`: [`FilterCondition`](interfaces/FilterCondition.md), `dataItem`: `any`) => `boolean` |
| `evaluateAlphanumericCondition` | (`value`: `undefined` \| `string`, `operator`: [`FilterOperator`](enums/FilterOperator.md), `conditionValue`: `string`) => `boolean` |
| `evaluateNumericCondition` | (`value`: `undefined` \| `number`, `operator`: [`FilterOperator`](enums/FilterOperator.md), `conditionValue`: `number`) => `boolean` |

___

### Formatter

• `Const` **Formatter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fromCamelCase` | (`value`: `string`) => `string` |
| `columnTitle` | (`column`: [`Column`](interfaces/Column.md)) => `string` |

___

### DataGridVue

• `Const` **DataGridVue**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `install` | (`app`: `App`, `options?`: [`DataGridVueOptions`](interfaces/DataGridVueOptions.md)) => `void` |

___

### ClientSideSort

• `Const` **ClientSideSort**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `sort` | (`sort`: [`Sort`](interfaces/Sort.md)[], `dataItems`: `any`[]) => `void` |
| `sortField` | (`sort`: [`Sort`](interfaces/Sort.md), `a`: `any`, `b`: `any`) => `number` |
| `compareAlphanumeric` | (`a`: `string`, `b`: `string`) => `number` |
| `compareNumeric` | (`a`: `number`, `b`: `number`) => `number` |
| `compareDate` | (`a`: `Date`, `b`: `Date`) => `number` |
| `compareDateTime` | (`a`: `Date`, `b`: `Date`) => `number` |

___

### StubStorageService

• `Const` **StubStorageService**: [`StorageService`](interfaces/StorageService.md)
