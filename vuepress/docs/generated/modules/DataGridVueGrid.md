# Module: DataGridVueGrid

## Table of contents

### Properties

- [data](undefined)
- [serverSideOptions](undefined)
- [customDataService](undefined)
- [columns](undefined)
- [allowColumnReorder](undefined)
- [paged](undefined)
- [initialPageSize](undefined)
- [pageSizes](undefined)
- [sortOptions](undefined)
- [showColumnSelection](undefined)
- [localStorageType](undefined)
- [storageKey](undefined)
- [serverSideStorageOptions](undefined)
- [customStorageService](undefined)

## Properties

### data

• **data**: `Object`

**`Param`**

test

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `ArrayConstructor` |
| `required` | ``false`` |
| `default` | `undefined` |

___

### serverSideOptions

• **serverSideOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `PropType`\<[`ServerSideDataServiceOptions`](../interfaces/ServerSideDataServiceOptions.md)\> |
| `required` | ``false`` |
| `default` | `undefined` |

___

### customDataService

• **customDataService**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `PropType`\<[`DataService`](../interfaces/DataService.md)\> |
| `required` | ``false`` |
| `default` | `undefined` |

___

### columns

• **columns**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | (`arrayLength`: `number`) => [`Column`](../interfaces/Column.md)[](...`items`: [`Column`](../interfaces/Column.md)[]) => [`Column`](../interfaces/Column.md)[](`arrayLength`: `number`) => [`Column`](../interfaces/Column.md)[](...`items`: [`Column`](../interfaces/Column.md)[]) => [`Column`](../interfaces/Column.md)[] |
| `type.isArray` | [object Object] |
| `type.prototype` | `any`[] |
| `type.from` | [object Object] |
| `type.of` | [object Object] |
| `type.[species]` | `ArrayConstructor` |
| `required` | ``true`` |

___

### allowColumnReorder

• **allowColumnReorder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `BooleanConstructor` |
| `required` | ``false`` |
| `default` | `boolean` |

___

### paged

• **paged**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `BooleanConstructor` |
| `required` | ``false`` |
| `default` | `boolean` |

___

### initialPageSize

• **initialPageSize**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `NumberConstructor` |
| `required` | ``false`` |
| `default` | `number` |

___

### pageSizes

• **pageSizes**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | (`arrayLength`: `number`) => `Number`[](...`items`: `Number`[]) => `Number`[](`arrayLength`: `number`) => `Number`[](...`items`: `Number`[]) => `Number`[] |
| `type.isArray` | [object Object] |
| `type.prototype` | `any`[] |
| `type.from` | [object Object] |
| `type.of` | [object Object] |
| `type.[species]` | `ArrayConstructor` |
| `required` | ``false`` |
| `default` | `number`[] |

___

### sortOptions

• **sortOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `PropType`\<[`SortOptions`](../interfaces/SortOptions.md)\> |
| `required` | ``false`` |
| `default` | `undefined` |

___

### showColumnSelection

• **showColumnSelection**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `BooleanConstructor` |
| `required` | ``false`` |
| `default` | `boolean` |

___

### localStorageType

• **localStorageType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `NumberConstructor` |
| `required` | ``false`` |
| `default` | [`LocalStorageType`](../enums/LocalStorageType.md) |

___

### storageKey

• **storageKey**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `StringConstructor` |
| `required` | ``false`` |
| `default` | `string` |

___

### serverSideStorageOptions

• **serverSideStorageOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `PropType`\<[`ServerSideStorageServiceOptions`](../interfaces/ServerSideStorageServiceOptions.md)\> |
| `required` | ``false`` |
| `default` | `undefined` |

___

### customStorageService

• **customStorageService**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `PropType`\<[`StorageService`](../interfaces/StorageService.md)\> |
| `required` | ``false`` |
| `default` | `undefined` |
