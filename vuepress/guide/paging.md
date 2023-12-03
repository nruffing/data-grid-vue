# Paging

Data Grid Vue supports paging data that is displayed in the data grid. This is enabled by default with a page size of `15` and user-selectable page sizes of `15, 25, and 50`.

## Initial Page Size

The initial page size can be set with the [`initialPageSize`](/generated/DataGridVueGrid/#initialpagesize) property.

```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="data"
  :initial-page-size="25"
>
</dgv-data-grid>
```

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="columns"
    :data="DEMO.data"
    :initial-page-size="25"
  />
</div>

## Page Size Selection

The possible page sizes the user can choose between can be set with the [`pageSizes`](/generated/DataGridVueGrid/#pagesizes) property.

```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="data"
  :initial-page-size="25"
  :page-sizes="[10, 25, 100, 200]"
>
</dgv-data-grid>
```

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="columns"
    :data="DEMO.data"
    :initial-page-size="25"
    :page-sizes="[10, 25, 100, 200]"
  />
</div>

The select element that allows users to change the page size is only displayed if more than one page size is supplied.

```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="data"
  :initial-page-size="25"
  :page-sizes="[]"
>
</dgv-data-grid>
```

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="columns"
    :data="DEMO.data"
    :initial-page-size="25"
    :page-sizes="[]"
  />
</div>

## No Paging

Paging can be turned off by passing `false` to the [`paged`](/generated/DataGridVueGrid/#paged) property on the data grid component.

When paging is turned off the page navigation and page size selection controls are removed from the data grid's footer.

The current page and the page size are sent to the data service with a value of `-1` when paging is turned off. The [ClientSideDataService](/generated/classes/ClientSideDataService.html) will bypass the paging step completely. The [ServerSideDataService](/generated/classes/ServerSideDataService.html) will send the current page and page size of `-1` to the server.

```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="data"
  :paged="false"
>
</dgv-data-grid>
```

<div class="grid-container">
  <dgv-data-grid
    v-model:columns="columns"
    :data="DEMO.data"
    :paged="false"
  />
</div>

## Accessibility

All enabled elements in the data grid's footer except the display text saying how many items are in the grid are part of the tab order in order to allow them to be navigated to via keyboard.

The total number of items in the grid is part of the `aria-label` for the data grid's content body. For example, `Data grid content, currently displaying page 1 with 25 of 40 total items`.

All page buttons and page size select have `aria-label` values specified including informing the user if its the current page. For example, `Page 1, this is the current page` or `Go to page 2 of 4`.



<script lang="ts" setup>
import { inject, ref } from 'vue'
import { type Column, Field, DataType, FilterOperator } from 'data-grid-vue'

const DEMO = inject('demo')

const columns = ref([...[
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

