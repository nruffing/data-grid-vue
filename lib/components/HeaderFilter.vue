<template>
  <div class="dgv-filter">
    <FilterOperatorSelect
      v-if="column.filterable"
      v-model="operator"
      :operators="column.filterOptions?.operators ?? []"
      @update:modelValue="onFilterValueUpdated"
    />
    <input
      v-if="column.filterable"
      ref="input"
      :type="inputType"
      @input="onFilterValueUpdated"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { DataType, type Column } from '../DataGridVue'
import { FilterOperator, ValidOperatorsMap, type FilterCondition } from '../Filter'
import FilterOperatorSelect from './FilterOperatorSelect.vue'

interface Data {
  operator: FilterOperator
}

/** @group Components */
export default defineComponent({
  name: 'HeaderFilter',
  components: {
    FilterOperatorSelect,
  },
  data(): Data {
    return {
      operator: FilterOperator.equals,
    }
  },
  props: {
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
    initialFilterCondition: {
      type: Object as PropType<FilterCondition>,
      required: false,
      default: undefined,
    },
  },
  computed: {
    inputType(): string {
      if (this.column.dataType === DataType.number) {
        return 'number'
      }
      return 'text'
    },
  },
  mounted() {
    if (this.initialFilterCondition) {
      this.getInput().value = this.initialFilterCondition.value ?? ''
      this.operator = this.initialFilterCondition.operator
    } else {
      this.operator = this.getDefaultOperator()
    }
  },
  methods: {
    getInput(): HTMLInputElement {
      return this.$refs.input as HTMLInputElement
    },
    getDefaultOperator(): FilterOperator {
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
    onFilterValueUpdated() {
      this.$emit('updated', {
        fieldName: this.column.field.fieldName,
        operator: this.operator,
        dataType: this.column.dataType,
        value: this.getInput().value,
      } as FilterCondition)
    },
    clearFilter() {
      const input = this.getInput()
      if (input) {
        input.value = ''
      }
    },
  },
})
</script>
