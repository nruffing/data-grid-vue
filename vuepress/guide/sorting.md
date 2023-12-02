# Sorting

Data Grid Vue supports allowing users to sort data within the data grid by a particular column. To enable this functionality pass [`SortOptions`](/generated/interfaces/SortOptions.html) to the [`sortOptions`](/generated/DataGridVueGrid/#sortoptions) prop of the data grid component. Then set the `sortable` property on each column definition that the user should be allowed to sort. Columns can then be sorted by clicking the column headers.

In the following example all but the `Last Name` column are configured to be sortable.

```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="DEMO.data"
  :sort-options="{ sortable: true }"
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
    sortable: true,
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
    sortable: true,
  }, 
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    sortable: false,
  },
] as Column[]

const columns = ref<Column[]>([...staticColumns])
const data = [...] as TestDataItem[]
```

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="sortableColumns"
    :data="DEMO.data"
    :sort-options="{ sortable: true }"
  />
</div>

The default sort behavior is that only a single column can be sorted at a time. Clicking another sortable column clears the existing sort. Clicking a sort column again will change the sort from ascending to descending. Clicking a third time will remove the sort from the column.

## Multi-Column Sort

If [`SortOptions.multiColumn`](/generated/interfaces/SortOptions.html) is set to true then multiple columns can be included in the sort. Order of precedence in the sort will be in the order in which the columns were added to sort and is indicated with a number next to the sort direction arrow icon in the column header. The same three-click behavior applies as if only one column could be sorted at once.

```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="DEMO.data"
  :sort-options="{
    sortable: true,
    multiColumn: true,
  }"
>
</dgv-data-grid>
```

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="sortableColumns"
    :data="DEMO.data"
    :sort-options="{
      sortable: true,
      multiColumn: true,
    }"
  />
</div>

## Accessibility

Header cells are part of the tab order in order to allow them to be navigated to via keyboard. When a header cell has focus due to keyboard navigation it is displayed with an additional outline using the `:focus-visible` CSS pseudo-class.

When a header cell is focused the same sort functionality can be invoked via `space` or `enter` instead of a click.

Header cells also have a dynamic `aria-label` value set to allow screen readers to inform the user of which column they are on, its current state, and possible actions. For example, `First Name, currently sorted ascending, use space bar to sort descending`.



<script lang="ts" setup>
import { inject, ref } from 'vue'
import { type Column, Field, DataType } from 'data-grid-vue'

const DEMO = inject('demo')

const sortableColumns = ref([...[
  {
    field: new Field('id'),
    dataType: DataType.number,
    sortable: true,
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
    sortable: true,
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    sortable: false,
  },
] as Column[]])
</script>
