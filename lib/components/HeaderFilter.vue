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
      :aria-label="ariaLabel"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { DataType, type Column } from '../DataGridVue'
import { FilterOperator, ValidOperatorsMap, type FilterCondition } from '../Filter'
import FilterOperatorSelect from './FilterOperatorSelect.vue'
import Formatter from '../Formatter'

interface Data {
  operator: FilterOperator
}

/**
 * @group Components
 * @description The filter for a column.
 */
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
    /**
     * @description The {@link Column} currently being rendered.
     */
    column: {
      type: Object as PropType<Column>,
      required: true,
    },
    /**
     * @description The {@link FilterCondition} for the current column.
     * @defaultValue undefined
     */
    initialFilterCondition: {
      type: Object as PropType<FilterCondition>,
      required: false,
      default: undefined,
    },
  },
  emits: {
    /**
     * @group emits
     * @description Event emitted when the {@link FilterCondition} is updated.
     * @param condition The updated {@link FilterCondition}
     */
    updated(condition: FilterCondition): boolean {
      return true
    },
  },
  computed: {
    inputType(): string {
      if (this.column.dataType === DataType.number) {
        return 'number'
      }
      return 'text'
    },
    ariaLabel(): string {
      return Formatter.ariaColumnLabel(this.column, 'Filter')
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
