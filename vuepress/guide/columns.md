# Columns

[Column](/generated/interfaces/Column.html) definitions must be supplied via the `columns` prop on the `dgv-data-grid` component. The column definitions describe the desired display behavior and functionality of each column. 

```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="data"
>
</dgv-data-grid>
```

```ts
import { ref } from 'vue'
import { DataGridVueGrid, type Column } from 'data-grid-vue'

const staticColumns = [
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
  }, 
] as Column[]

const columns = ref<Column[]>([...staticColumns])
const data = [...] as TestDataItem[]
```

Columns will be displayed in the order in which they are in the array passed to the `columns` prop.

!!!include(columns-note.md)!!!

## Field & Data Type

At a minimum a column requires [`field`](/generated/classes/Field.html) and [`dataType`](/generated/enumerations/DataType.html) to be defined.

```ts
import { type Column, Field, DataType } from 'data-grid-vue'

const staticColumns = [
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
  }  
] as Column[]
```

The field class constructor requires a field name to act as the fields identifier and default property name of the corresponding data on the data item.

::: tip Important
The field name should be unique across all fields on the data grid.
:::

The field class constructor has an optional second parameter for a function to retrieve the data that should be rendered in the column this field is apart of. If no data retrieval function is specified it is assumed that the field name matches a property on the data item object and the data grid will attempt to just use a string index on that object to retrieve the data.

```ts
import { type Column, Field, DataType } from 'data-grid-vue'

const staticColumns = [
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
  },
  {
    field: new Field('fullName', (dataItem) => `${dataItem.firstName} ${dataItem.lastName}`),
    dataType: DataType.alphanumeric,
  }
] as Column[]
```

The column's data type does not have any effect on how the data is rendered. It is used to determine how sorting and filtering should be handled for that column. However, it is recommended that the specified data type matches the data type of the value that the field is going to resolve to.

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="fieldAndDataTypeColumns"
    :data="DEMO.data"
  />
</div>


## Key Column

Mostly to correctly support Vue's vnode replacement algorithms by specifying [`key`](https://vuejs.org/api/built-in-special-attributes.html#key) properties, it is highly recommended to specify one column as the key column. If no key column is specified then the first column (as of the components mounted event) will be used.

The key column should be a column where the value is unique across all data items. The column's value is then used as the key for the template vnode that represents each row of the data grid.

```ts
import { type Column, Field, DataType } from 'data-grid-vue'

const staticColumns = [
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
  },
] as Column[]
```

::: tip Tip
If the data item does not have a single property that is a unique identifier you can achieve a composite key by adding a hidden column that has a field value getter that aggregates multiple properties.
:::


## Title

The column's title is rendered as the content of the header cell for that column. If a title is not explicitly defined in the column's definition the field name is converted to be [title-cased](https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case) and that is used as the column's title.

```ts
import { type Column, Field, DataType } from 'data-grid-vue'

const staticColumns = [
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
  },
  {
    field: new Field('firstName'), // Column header will be 'First Name'
    dataType: DataType.alphanumeric,
  },
  {
    title: 'LAST NAME', // Column header will be 'LAST NAME'
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
  }
] as Column[]
```

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="titleColumns"
    :data="DEMO.data"
  />
</div>

## Width

The column's width can be specified in various ways via the [`width`](/generated/interfaces/Column.html#properties) property. All widths are specified as a `string` and currently `px`, `%`, and `*` are supported as units.

* `px` - Specify a constant width for the column in CSS pixels (e.g. `'100px'`)
* `%` - Specify the column take a percentage of the data grid's total width (e.g. `'20%'`)
* `*` - Specify the column take up a proportional width of the remaining width of the data grid after absolute widths are accounted for. For example, if there are two proportional widths specified as `*` and `2*` then one column will take up 1/3rd the remaining width and the other column will take up the remaining 2/3rds.

Column's without a width specified default to function as if they were configured with `*` and will take up an equal proportion of the remaining width.

```ts
import { type Column, Field, DataType } from 'data-grid-vue'

const staticColumns = [
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
    width: '50px',
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    width: '2*',
  },
] as Column[]
```

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="widthColumns"
    :data="DEMO.data"
  />
</div>


## Visibility

Columns can be hidden by specifying `true` for the `isHidden` property.

The `isHidden` property is how the data grid supports allowing the user to add/remove columns from view. The add/remove columns feature can be enabled with the [`showColumnSelection`](/generated/DataGridVueGrid/#showcolumnselection) property. When set to `true` an `Add/Remove Columns` option is added to the header options area above the data grid. Clicking this option will open a popup menu with the ability to toggle the visibility of each column, even ones that were initially hidden.

```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="data"
  :show-column-selection="true"
>
</dgv-data-grid>
```

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="addRemoveColumns"
    :data="DEMO.data"
    :show-column-selection="true"
  />
</div>

## Reorder

Columns can be reordered by the user if the [`allowColumnReorder`](/generated/DataGridVueGrid/#allowcolumnreorder) property is set to the `true` on the data grid component.

Columns can be reordered by dragging and dropping the column headers.

```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="data"
  :allow-column-reorder="true"
>
</dgv-data-grid>
```

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="reorderColumns"
    :data="DEMO.data"
    :allow-column-reorder="true"
  />
</div>


## Accessibility

Column headers cells are part of the tab order in order to allow them to be navigated to via keyboard. When a header cell has focus due to keyboard navigation it is displayed with an additional outline using the `:focus-visible` CSS pseudo-class.

When a header cell is focused the `left` and `right` arrow keys can be used to invoke a column reorder by one column.

Header cells also have a dynamic `aria-label` value set to allow screen readers to inform the user of which column they are on, its current state, and possible actions. For example, `First Name, currently sorted ascending, use space bar to sort descending, use left and right arrow keys to reorder, currently in position 4 of 6 columns`.

Actions in the header options area above the data grid are part of the tab order to allow them to be navigated to via keyboard.

When header options are focused they can be invoked via `space` or `enter` instead of a click. This includes the `Add/Remove Columns`. When invoked focus is placed on the first toggle and the user can cycle through each toggle using the `tab` key. The toggle can be invoked with the `space` key just like a checkbox.

The column visibility toggles also have an `aria-label` specified which informs the user of the current state. For example, `First Name is currently hidden. Use the space bar to show it`.


<script lang="ts" setup>
import { inject, ref } from 'vue'
import { type Column, Field, DataType } from 'data-grid-vue'

const DEMO = inject('demo')

const fieldAndDataTypeColumns = ref([...[
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
  },
  {
    field: new Field('fullName', (dataItem) => `${dataItem.firstName} ${dataItem.lastName}`),
    dataType: DataType.alphanumeric,
  }
] as Column[]])

const titleColumns = ref([...[
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
  },
  {
    field: new Field('firstName'), // Column header will be 'First Name'
    dataType: DataType.alphanumeric,
  },
  {
    title: 'LAST NAME', // Column header will be 'LAST NAME'
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
  }
] as Column[]])

const widthColumns = ref([...[
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
    width: '50px',
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    width: '2*',
  },
] as Column[]])

const addRemoveColumns = ref([...[
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
    width: '50px',
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    width: '2*',
  },
] as Column[]])

const reorderColumns = ref([...[
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
    width: '50px',
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    width: '2*',
  },
] as Column[]])
</script>