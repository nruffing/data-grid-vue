# Module: DataGridVueGrid

## Table of contents

### Properties

- [allowColumnReorder](undefined)
- [columns](undefined)
- [customDataService](undefined)
- [customStorageService](undefined)
- [data](undefined)
- [initialPageSize](undefined)
- [localStorageType](undefined)
- [pageSizes](undefined)
- [paged](undefined)
- [serverSideOptions](undefined)
- [serverSideStorageOptions](undefined)
- [showColumnSelection](undefined)
- [sortOptions](undefined)
- [storageKey](undefined)

## Properties

### allowColumnReorder

• **allowColumnReorder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `boolean` |
| `required` | ``false`` |
| `type` | `BooleanConstructor` |

#### Defined in

components/DataGridVue.vue.d.ts:63

___

### columns

• **columns**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `required` | ``true`` |
| `type` | (`arrayLength`: `number`) => [`Column`](../interfaces/Column.md)[](...`items`: [`Column`](../interfaces/Column.md)[]) => [`Column`](../interfaces/Column.md)[](`arrayLength`: `number`) => [`Column`](../interfaces/Column.md)[](...`items`: [`Column`](../interfaces/Column.md)[]) => [`Column`](../interfaces/Column.md)[] |
| `type.[species]` | `ArrayConstructor` |
| `type.prototype` | `any`[] |
| `type.from` | [object Object] |
| `type.isArray` | [object Object] |
| `type.of` | [object Object] |

#### Defined in

components/DataGridVue.vue.d.ts:46

___

### customDataService

• **customDataService**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `undefined` |
| `required` | ``false`` |
| `type` | `PropType`\<[`DataService`](../interfaces/DataService.md)\> |

#### Defined in

components/DataGridVue.vue.d.ts:41

___

### customStorageService

• **customStorageService**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `undefined` |
| `required` | ``false`` |
| `type` | `PropType`\<[`StorageService`](../interfaces/StorageService.md)\> |

#### Defined in

components/DataGridVue.vue.d.ts:121

___

### data

• **data**: `Object`

**`Param`**

test

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `undefined` |
| `required` | ``false`` |
| `type` | `ArrayConstructor` |

#### Defined in

components/DataGridVue.vue.d.ts:31

___

### initialPageSize

• **initialPageSize**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `number` |
| `required` | ``false`` |
| `type` | `NumberConstructor` |

#### Defined in

components/DataGridVue.vue.d.ts:73

___

### localStorageType

• **localStorageType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | [`LocalStorageType`](../enums/LocalStorageType.md) |
| `required` | ``false`` |
| `type` | `NumberConstructor` |

#### Defined in

components/DataGridVue.vue.d.ts:106

___

### pageSizes

• **pageSizes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `number`[] |
| `required` | ``false`` |
| `type` | (`arrayLength`: `number`) => `Number`[](...`items`: `Number`[]) => `Number`[](`arrayLength`: `number`) => `Number`[](...`items`: `Number`[]) => `Number`[] |
| `type.[species]` | `ArrayConstructor` |
| `type.prototype` | `any`[] |
| `type.from` | [object Object] |
| `type.isArray` | [object Object] |
| `type.of` | [object Object] |

#### Defined in

components/DataGridVue.vue.d.ts:78

___

### paged

• **paged**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `boolean` |
| `required` | ``false`` |
| `type` | `BooleanConstructor` |

#### Defined in

components/DataGridVue.vue.d.ts:68

___

### serverSideOptions

• **serverSideOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `undefined` |
| `required` | ``false`` |
| `type` | `PropType`\<[`ServerSideDataServiceOptions`](../interfaces/ServerSideDataServiceOptions.md)\> |

#### Defined in

components/DataGridVue.vue.d.ts:36

___

### serverSideStorageOptions

• **serverSideStorageOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `undefined` |
| `required` | ``false`` |
| `type` | `PropType`\<[`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md)\> |

#### Defined in

components/DataGridVue.vue.d.ts:116

___

### showColumnSelection

• **showColumnSelection**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `boolean` |
| `required` | ``false`` |
| `type` | `BooleanConstructor` |

#### Defined in

components/DataGridVue.vue.d.ts:101

___

### sortOptions

• **sortOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `undefined` |
| `required` | ``false`` |
| `type` | `PropType`\<[`SortOptions`](../interfaces/SortOptions.md)\> |

#### Defined in

components/DataGridVue.vue.d.ts:96

___

### storageKey

• **storageKey**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | `string` |
| `required` | ``false`` |
| `type` | `StringConstructor` |

#### Defined in

components/DataGridVue.vue.d.ts:111
