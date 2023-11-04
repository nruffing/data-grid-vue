# Documentation

## Table of contents

### Enumerations

- [DataType](enums/DataType.md)
- [FilterOperator](enums/FilterOperator.md)
- [LocalStorageType](enums/LocalStorageType.md)
- [SortType](enums/SortType.md)

### Classes

- [ClientSideDataService](classes/ClientSideDataService.md)
- [Field](classes/Field.md)
- [LocalStorageService](classes/LocalStorageService.md)
- [ServerSideDataService](classes/ServerSideDataService.md)
- [ServerSideStorageService](classes/ServerSideStorageService.md)
- [SessionStorageService](classes/SessionStorageService.md)

### Interfaces

- [Column](interfaces/Column.md)
- [ColumnFilterOptions](interfaces/ColumnFilterOptions.md)
- [DataGridVueOptions](interfaces/DataGridVueOptions.md)
- [DataService](interfaces/DataService.md)
- [Filter](interfaces/Filter.md)
- [FilterCondition](interfaces/FilterCondition.md)
- [FilterOptions](interfaces/FilterOptions.md)
- [GetGridStateRequest](interfaces/GetGridStateRequest.md)
- [GridState](interfaces/GridState.md)
- [PageData](interfaces/PageData.md)
- [PageDataRequest](interfaces/PageDataRequest.md)
- [ServerSideDataServiceOptions](interfaces/ServerSideDataServiceOptions.md)
- [ServerSideStorageServiceOptions](interfaces/ServerSideStorageServiceOptions.md)
- [SetGridStateRequest](interfaces/SetGridStateRequest.md)
- [Sort](interfaces/Sort.md)
- [SortOptions](interfaces/SortOptions.md)
- [StorageService](interfaces/StorageService.md)

### Type Aliases

- [BeforeGetRequestHandler](README.md#beforegetrequesthandler)
- [BeforeRequestHandler](README.md#beforerequesthandler)
- [BeforeSetRequestHandler](README.md#beforesetrequesthandler)
- [FieldValueGetter](README.md#fieldvaluegetter)
- [GetResponseHandler](README.md#getresponsehandler)
- [ResponseHandler](README.md#responsehandler)
- [SetResponseHandler](README.md#setresponsehandler)

### Variables

- [ClientSideFilter](README.md#clientsidefilter)
- [ClientSideSort](README.md#clientsidesort)
- [ColumnSelectionItem](README.md#columnselectionitem)
- [DataGridVue](README.md#datagridvue)
- [DataGridVueGrid](README.md#datagridvuegrid)
- [EmptyPageData](README.md#emptypagedata)
- [FilterOperatorSelect](README.md#filteroperatorselect)
- [Formatter](README.md#formatter)
- [HeaderCell](README.md#headercell)
- [HeaderFilter](README.md#headerfilter)
- [Icon](README.md#icon)
- [PageNavigation](README.md#pagenavigation)
- [StubDataService](README.md#stubdataservice)
- [StubStorageService](README.md#stubstorageservice)
- [ValidOperatorsMap](README.md#validoperatorsmap)

## Type Aliases

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

#### Defined in

Storage.d.ts:39

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

#### Defined in

DataService.d.ts:25

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

#### Defined in

Storage.d.ts:41

___

### FieldValueGetter

Ƭ **FieldValueGetter**: (`dataItem`: `any`) => `any` \| `undefined`

#### Defined in

DataGridVue.d.ts:23

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

#### Defined in

Storage.d.ts:40

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

#### Defined in

DataService.d.ts:26

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

#### Defined in

Storage.d.ts:42

## Variables

### ClientSideFilter

• `Const` **ClientSideFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `evaluateAlphanumericCondition` | (`value`: `undefined` \| `string`, `operator`: [`FilterOperator`](enums/FilterOperator.md), `conditionValue`: `string`) => `boolean` |
| `evaluateCondition` | (`condition`: [`FilterCondition`](interfaces/FilterCondition.md), `dataItem`: `any`) => `boolean` |
| `evaluateConditions` | (`conditions`: [`FilterCondition`](interfaces/FilterCondition.md)[], `dataItem`: `any`) => `boolean` |
| `evaluateFilter` | (`filter`: [`Filter`](interfaces/Filter.md), `dataItem`: `any`) => `boolean` |
| `evaluateNumericCondition` | (`value`: `undefined` \| `number`, `operator`: [`FilterOperator`](enums/FilterOperator.md), `conditionValue`: `number`) => `boolean` |
| `filter` | (`filter`: [`Filter`](interfaces/Filter.md), `dataItems`: `any`[]) => `any`[] |

#### Defined in

Filter.d.ts:27

___

### ClientSideSort

• `Const` **ClientSideSort**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `compareAlphanumeric` | (`a`: `string`, `b`: `string`) => `number` |
| `compareDate` | (`a`: `Date`, `b`: `Date`) => `number` |
| `compareDateTime` | (`a`: `Date`, `b`: `Date`) => `number` |
| `compareNumeric` | (`a`: `number`, `b`: `number`) => `number` |
| `sort` | (`sort`: [`Sort`](interfaces/Sort.md)[], `dataItems`: `any`[]) => `void` |
| `sortField` | (`sort`: [`Sort`](interfaces/Sort.md), `a`: `any`, `b`: `any`) => `number` |

#### Defined in

Sort.d.ts:15

___

### ColumnSelectionItem

• `Const` **ColumnSelectionItem**: `DefineComponent`

#### Defined in

components/ColumnSelectionItem.vue.d.ts:3

___

### DataGridVue

• `Const` **DataGridVue**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `install` | (`app`: `App`, `options?`: [`DataGridVueOptions`](interfaces/DataGridVueOptions.md)) => `void` |

#### Defined in

Plugin.d.ts:6

___

### DataGridVueGrid

• `Const` **DataGridVueGrid**: `DefineComponent`

#### Defined in

components/DataGridVue.vue.d.ts:28

___

### EmptyPageData

• `Const` **EmptyPageData**: [`PageData`](interfaces/PageData.md)

#### Defined in

DataGridVue.d.ts:34

___

### FilterOperatorSelect

• `Const` **FilterOperatorSelect**: `DefineComponent`

#### Defined in

components/FilterOperatorSelect.vue.d.ts:2

___

### Formatter

• `Const` **Formatter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `fromCamelCase` | (`value`: `string`) => `string` |

#### Defined in

Formatter.d.ts:1

___

### HeaderCell

• `Const` **HeaderCell**: `DefineComponent`

#### Defined in

components/HeaderCell.vue.d.ts:4

___

### HeaderFilter

• `Const` **HeaderFilter**: `DefineComponent`

#### Defined in

components/HeaderFilter.vue.d.ts:7

___

### Icon

• `Const` **Icon**: `DefineComponent`

#### Defined in

components/Icon.vue.d.ts:1

___

### PageNavigation

• `Const` **PageNavigation**: `DefineComponent`

#### Defined in

components/PageNavigation.vue.d.ts:1

___

### StubDataService

• `Const` **StubDataService**: [`DataService`](interfaces/DataService.md)

#### Defined in

DataService.d.ts:7

___

### StubStorageService

• `Const` **StubStorageService**: [`StorageService`](interfaces/StorageService.md)

#### Defined in

Storage.d.ts:19

___

### ValidOperatorsMap

• `Const` **ValidOperatorsMap**: `Map`\<[`DataType`](enums/DataType.md), `Set`\<[`FilterOperator`](enums/FilterOperator.md)\>\>

#### Defined in

Filter.d.ts:16
