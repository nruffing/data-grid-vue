<div class="grid-container">
  <dgv-data-grid
    v-model:columns="columns"
    :data="DEMO.data"
    :sort-options="{
      sortable: true,
      multiColumn: false,
    }"
    :allow-column-reorder="true"
    :show-column-selection="true"
  >
  </dgv-data-grid>
</div>

!!!include(simple-example-codeblock.md)!!!

<CodeGroup>
  <CodeGroupItem title="Options API" active>

```ts
import { defineComponent } from 'vue'
import { DataGridVueGrid, type Column } from 'data-grid-vue'

export default defineComponent({
  components: {
    DataGridVueGrid,
  },
  data() {
    return {
      columns: [...staticColumns] as Column[],
      dataItems: [...] as TestDataItem[],
    }
  },
})
```

  </CodeGroupItem>  
  <CodeGroupItem title="<script setup>">

```ts
import { ref } from 'vue'
import { DataGridVueGrid, type Column } from 'data-grid-vue'

const columns = ref<Column[]>([...staticColumns])
const data = [...] as TestDataItem[]
```

  </CodeGroupItem>
</CodeGroup>

```ts
interface DemoDataItem {
  id: number
  firstName: string
  lastName: string
  email?: string
}

const staticColumns = [
  {
    field: new Field('id'),
    dataType: DataType.number,
    isKey: true,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.greaterThanOrEqualTo],
    },
    width: '10%',
  },
  {
    field: new Field('firstName'),
    dataType: DataType.alphanumeric,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.contains],
    },
    width: '*',
  },
  {
    field: new Field('lastName'),
    dataType: DataType.alphanumeric,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.contains],
    },
    width: '*',
  },
  {
    field: new Field('email'),
    dataType: DataType.alphanumeric,
    sortable: true,
    filterable: true,
    filterOptions: {
      operators: [FilterOperator.contains],
    },
    width: '2*',
  },
] as Column[]
```

<script lang="ts" setup>
import { inject, ref } from 'vue'

const DEMO = inject('demo')

const columns = ref([...DEMO.columns])
</script>
