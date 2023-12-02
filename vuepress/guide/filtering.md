# Filtering

Data Grid Vue supports allowing users to filter data within the data grid by one or multiple columns. To enable this functionality configure the filter options on each column definition that the user should be allowed to filter. 

To enable filtering set the [`filterable`](/generated/interfaces/Column.html#properties) on each column definition that the user should be allowed to filter.

If any column is filterable then the `Show Filter Options` and `Clear Filters` actions will be displayed in the options header directly above the data grid. This option toggles whether the filter row below the header cells is displayed. The data grid's current filter does not change if the filter row is hidden.

By default the data grid will filter using the first filter operator for the column's data type in [`ValidOperatorsMaps`](/generated/variables/ValidOperatorsMap.html).  Filter operators can be explicitly configured using the [`filterOptions.operators`](/generated/interfaces/ColumnFilterOptions.html) property on each column definition.  Available filter operators are defined in [`FilterOperator`](/generated/enumerations/FilterOperator.html) and the valid operators for each data type are in configured in [`ValidOperatorsMaps`](/generated/variables/ValidOperatorsMap.html).  If a column is configured with multiple operators then icons for each of those operators are displayed above the filter input for the user to toggle between.

```vue
<dgv-data-grid
  v-model:columns="filterableColumns"
  :data="data"
>
</dgv-data-grid>
```

```ts
import { ref } from 'vue'
import { type Column, Field, DataType, FilterOperator } from 'data-grid-vue'

const filterableColumns = ref([...[
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
    filterable: true,
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
    filterable: true,
    filterOptions: {
      operators: [
        FilterOperator.equals,
        FilterOperator.contains,
      ],
    },
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    sortable: false,
  },
] as Column[]])
```

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="filterableColumns"
    :data="DEMO.data"
  />
</div>

## Accessibility

Actions in the header options area above the data grid are part of the tab order to allow them to be navigated to via keyboard.

When header options are focused they can be invoked via `space` or `enter` instead of a click.

Header options have dynamic `aria-label` values that indicate what the option is and any applicable current state. For example, `Filter options are current shown, use space bar to toggle visibility`.

Filter row elements including the selectable filter operators are part of the tab order to allow them to be navigated to via keyboard. Filter operators that are focused can be selected with `space` or `enter` as if it were a radiobutton.

<script lang="ts" setup>
import { inject, ref } from 'vue'
import { type Column, Field, DataType, FilterOperator } from 'data-grid-vue'

const DEMO = inject('demo')

const filterableColumns = ref([...[
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
    filterable: true,
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
    filterable: true,
    filterOptions: {
      operators: [
        FilterOperator.equals,
        FilterOperator.contains,
      ],
    },
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    sortable: false,
  },
] as Column[]])
</script>

