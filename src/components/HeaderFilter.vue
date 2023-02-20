<template>
  <div class="dgv-filter">
    <FilterOperatorSelect :operators="column.filterOptions?.operators ?? []" />
    <input
      :type="inputType"  
      @input="onFilterValueUpdated"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { DataType, type Column } from '@/DataGridVue'
import { FilterOperator, ValidOperatorsMap, type FilterCondition } from '@/Filter';
import FilterOperatorSelect from './FilterOperatorSelect.vue';

export default defineComponent({
  name: 'HeaderFilter',
  components: {
    FilterOperatorSelect,
  },
  props: {
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
  },
  computed: {
    inputType(): string {
      if (this.column.dataType === DataType.number) {
        return "number"
      }
      return "text"
    },
    operator(): FilterOperator {
      if (this.column.filterOptions?.operators?.length) {
        return this.column.filterOptions.operators[0]
      }
      const dataTypeSet = ValidOperatorsMap.get(this.column.dataType)
      const operators = dataTypeSet?.values()
      const first = operators?.next()
      if (first) {
        return first.value
      }
      return FilterOperator.equals
    },
  },
  methods: {
    onFilterValueUpdated(event: Event) {
      const inputEvent = event as InputEvent
      const input = inputEvent.target as HTMLInputElement
      this.$emit('updated', {
        fieldName: this.column.field.fieldName,
        operator: this.operator,
        dataType: this.column.dataType,
        value: input.value,
      } as FilterCondition)
    },
  },
})
</script>