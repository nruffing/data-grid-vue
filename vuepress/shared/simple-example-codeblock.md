```vue
<dgv-data-grid
  v-model:columns="columns"
  :data="dataItems"
  :sort-options="{
    sortable: true,
    multiColumn: false,
  }"
  :allow-column-reorder="true"
  :show-column-selection="true"
>
</dgv-data-grid>
```